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

  const handleImagePlaceholder = () => {
    toast.info("Функцията за качване на снимки ще бъде активирана след свързване с облачно хранилище.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    
    // Симулация на изпращане - тук по-късно ще свържем Netlify Forms
    setTimeout(() => {
      toast.success("Благодарим за отзива! Ще бъде публикуван след одобрение.");
      setFormData({ author_name: "", rating: 5, comment: "", course_title: "", author_image: "" });
      setIsPending(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Оставете отзив</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Вашето име *</Label>
          <Input 
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
            placeholder="Кой курс посетихте?"
            value={formData.course_title}
            onChange={(e) => setFormData({ ...formData, course_title: e.target.value })}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Вашият отзив *</Label>
          <Textarea 
            placeholder="Споделете вашето мнение..."
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            required
            className="rounded-xl min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Ваша снимка (незадължително)</Label>
          <div 
            onClick={handleImagePlaceholder}
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-rose-300 transition-colors"
          >
            <Upload className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Добавете снимка</span>
          </div>
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
