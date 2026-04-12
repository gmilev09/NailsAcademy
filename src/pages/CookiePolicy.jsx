import { useEffect } from "react";
import { motion } from "framer-motion";
import { Cookie, ExternalLink } from "lucide-react";

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <Cookie className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Правна информация</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Политика за <span className="font-semibold text-rose-500">бисквитките</span>
            </h1>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-pink-50 prose prose-gray max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-700 leading-relaxed">
              Настоящата Политика за бисквитките обяснява какво представляват бисквитките (cookies), какви видове бисквитки използваме на уебсайта на Nails Academy, как ги използваме и как можете да управлявате Вашите предпочитания. Тази политика е част от нашата{" "}
              <a href="/PrivacyPolicy" className="text-rose-500 hover:underline">Политика за поверителност</a>{" "}
              и е в съответствие с Общия регламент относно защитата на данните (GDPR) и Директива 2002/58/ЕО (ePrivacy Directive).
            </p>

            <h2>1. Какво са бисквитките?</h2>
            <p>
              Бисквитките са малки текстови файлове, които се съхраняват на Вашето устройство (компютър, таблет или мобилен телефон) при посещение на уебсайт. Те позволяват на сайта да запомни Вашите действия и предпочитания (като език, размер на шрифта и други настройки за показване) за определен период от време, за да не се налага да ги задавате всеки път, когато посещавате сайта или преминавате от една страница на друга.
            </p>

            <h2>2. Какви видове бисквитки използваме?</h2>

            <h3>2.1. Строго необходими бисквитки</h3>
            <p>
              Тези бисквитки са от съществено значение за функционирането на уебсайта и не могат да бъдат деактивирани. Те обикновено се задават само в отговор на действия, предприети от Вас, като например настройка на предпочитания за поверителност, влизане в акаунт или попълване на формуляри. Без тези бисквитки сайтът не може да функционира правилно.
            </p>
            <ul>
              <li><strong>Сесийни бисквитки</strong> — поддържат Вашата сесия, докато навигирате в сайта</li>
              <li><strong>Бисквитки за съгласие</strong> — запомнят дали сте приели или отказали използването на бисквитки</li>
              <li><strong>Бисквитки за количка</strong> — съхраняват съдържанието на количката Ви за пазаруване</li>
            </ul>

            <h3>2.2. Аналитични бисквитки</h3>
            <p>
              Тези бисквитки ни позволяват да броим посещенията и да анализираме източниците на трафик, за да можем да измерим и подобрим ефективността на нашия сайт. Те ни помагат да разберем кои страници са най-популярни и как посетителите се придвижват в сайта. Цялата информация, която тези бисквитки събират, е обобщена и анонимна.
            </p>
            <ul>
              <li><strong>Vercel Analytics</strong> — събира анонимизирана информация за посещенията и взаимодействието със страниците</li>
            </ul>

            <h3>2.3. Функционални бисквитки</h3>
            <p>
              Тези бисквитки позволяват на уебсайта да предоставя подобрена функционалност и персонализация. Те могат да бъдат зададени от нас или от доставчици на услуги на трети страни, чиито услуги сме добавили към нашите страници. Ако не разрешите тези бисквитки, някои или всички от тези услуги може да не функционират правилно.
            </p>
            <ul>
              <li><strong>Предпочитания за език и регион</strong> — запомнят избрания от Вас език</li>
              <li><strong>Персонализирано съдържание</strong> — адаптират съдържанието спрямо Вашите предходни посещения</li>
            </ul>


            <h2>3. Как да управлявате бисквитките?</h2>
            <p>
              При първото Ви посещение на нашия уебсайт ще Ви бъде показан банер за бисквитки, чрез който можете да приемете или откажете използването на незадължителните бисквитки.
            </p>
            <p>
              Освен това можете да управлявате бисквитките чрез настройките на Вашия браузър. Повечето уеб браузъри позволяват контрол на бисквитките чрез настройките им. За да научите повече за бисквитките и как да ги управлявате, можете да посетите:
            </p>
            <ul>
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">
                  Apple Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p>
              Имайте предвид, че блокирането на всички бисквитки може да доведе до влошаване на функционалността на някои части от уебсайта.
            </p>

            <h2>4. Срок на съхранение на бисквитките</h2>
            <p>
              Срокът на съхранение на бисквитките зависи от техния тип:
            </p>
            <ul>
              <li><strong>Сесийни бисквитки</strong> — изтриват се автоматично при затваряне на браузъра</li>
              <li><strong>Постоянни бисквитки</strong> — остават на Вашето устройство за определен период (обикновено от 30 дни до 2 години) или докато не бъдат изтрити ръчно</li>
            </ul>

            <h2>5. Промени в тази политика</h2>
            <p>
              Запазваме си правото да актуализираме тази Политика за бисквитките по всяко време, за да отразим промени в нашите практики или по правни причини. Препоръчваме Ви периодично да преглеждате тази страница, за да бъдете информирани за евентуални промени.
            </p>

            <h2>6. Контакт</h2>
            <p>
              Ако имате въпроси относно нашата Политика за бисквитките, можете да се свържете с нас на:
            </p>
            <a
              href="mailto:bozhinova.nails.academy@gmail.com"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full text-sm font-medium transition-colors no-underline"
            >
              <ExternalLink className="w-4 h-4" />
              bozhinova.nails.academy@gmail.com
            </a>

            <p className="text-sm text-gray-500 mt-8">
              Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
