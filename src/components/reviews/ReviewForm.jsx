import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Star, Send, Upload, X } from "lucide-react";
import { toast } from "sonner";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    author_name: "",
    rating: 5,
    comment: "",
    course_title: "",
    author_image: ""
  });
  const [isPending, setIsPending] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Може да се качват само изображения.");
      event.target.value = "";
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Снимката трябва да е до 4MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : "";
      setFormData((current) => ({ ...current, author_image: value }));
      setSelectedImageName(file.name);
    };
    reader.onerror = () => {
      toast.error("Снимката не можа да бъде прочетена.");
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const clearSelectedImage = () => {
    setFormData((current) => ({ ...current, author_image: "" }));
    setSelectedImageName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: formData.author_name.trim(),
          rating: Number(formData.rating),
          comment: formData.comment.trim(),
          course_title: formData.course_title.trim(),
          author_image: formData.author_image.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Неуспешно изпращане на отзива.");
      }

      // Submit to Netlify Forms for tracking
      const netlifyFormData = new URLSearchParams();
      netlifyFormData.append("form-name", "reviews");
      netlifyFormData.append("author_name", formData.author_name.trim());
      netlifyFormData.append("rating", String(formData.rating));
      netlifyFormData.append("comment", formData.comment.trim());
      netlifyFormData.append("course_title", formData.course_title.trim());
      netlifyFormData.append("author_image", formData.author_image ? "uploaded" : "");
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: netlifyFormData.toString(),
      }).catch(() => {});

      toast.success("Благодарим за отзива! Ще бъде публикуван след одобрение.");
      setFormData({ author_name: "", rating: 5, comment: "", course_title: "", author_image: "" });
      setSelectedImageName("");
    } catch (error) {
      toast.error(error?.message || "Възникна проблем при изпращането.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      name="reviews"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-xl mx-auto"
    >
      <input type="hidden" name="form-name" value="reviews" />
      <p className="hidden" aria-hidden="true">
        <label>
          Не попълвайте това поле:
          <input name="bot-field" />
        </label>
      </p>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Оставете отзив</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Вашето име *</Label>
          <Input 
            name="author_name"
            placeholder="Име и фамилия"
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            required
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Оценка *</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="p-1"
              >
                <Star 
                  className={`w-6 h-6 ${star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Курс (незадължително)</Label>
          <Input 
            name="course_title"
            placeholder="Кой курс посетихте?"
            value={formData.course_title}
            onChange={(e) => setFormData({ ...formData, course_title: e.target.value })}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Вашият отзив *</Label>
          <Textarea 
            name="comment"
            placeholder="Споделете вашето мнение..."
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            required
            className="rounded-xl min-h-[100px]"
          />
        </div>

        <input type="hidden" name="author_image" value={formData.author_image} />
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
          <label
            htmlFor="review-image-upload"
            className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-rose-500 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Добави снимка
          </label>
          <input
            id="review-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {selectedImageName ? (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs text-gray-500 truncate max-w-[170px]">{selectedImageName}</span>
              <button
                type="button"
                onClick={clearSelectedImage}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Премахни снимката"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <span className="text-xs text-gray-400">Няма избрана снимка</span>
          )}
        </div>

        <Button 
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full py-6"
        >
          {isPending ? "Изпращане..." : (
            <div className="flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>Изпрати отзив</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
