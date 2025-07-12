import AnimationBlock from "@/components/AnimationBlock";
import Header from "@/components/header/header";
import Projects from "@/components/Projects";
import Starfield from "@/components/Starfield";

export default function Home() {
  return (
    <>
      <Header />
      <Starfield/>
      <main 
        className="text-white min-h-screen px-4 py-8 flex flex-col justify-center items-center gap-12 bg-gradient-to-br from-gray-900/50 to-pink-900/50"
        aria-label="Главная страница с проектами"
      >
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 mt-12 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            Мои пет-проекты
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Коллекция пет-проектов, демонстрирующих различные технологии и подходы к разработке
          </p>
        </div>

        {/* Контейнер проектов */}
        <section 
          className="w-full max-w-6xl"
          aria-label="Список проектов"
          role="region"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <AnimationBlock className="flex flex-col gap-4">
              <Projects />
            </AnimationBlock>
          </div>
        </section>

        {/* Дополнительная информация */}
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>Используйте навигацию для перехода между проектами</p>
        </div>
      </main>
    </>
  );
}
