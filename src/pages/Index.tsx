import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const heroSlides = [
    {
      image: "img/fc2827d7-0940-4270-9b43-a82bfa2d9634.jpg",
      title: "Абстрактная композиция",
      category: "Цифровое искусство"
    },
    {
      image: "img/f4ad274b-731e-4067-bb67-87d47f0526bc.jpg",
      title: "Современная иллюстрация",
      category: "Иллюстрация"
    },
    {
      image: "img/183e7062-488a-40af-ad07-27cf068f6bc2.jpg",
      title: "Архитектурная фотография",
      category: "Фотография"
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Минималистичная серия",
      category: "illustration",
      image: "img/f4ad274b-731e-4067-bb67-87d47f0526bc.jpg",
      description: "Коллекция абстрактных иллюстраций в минималистичном стиле",
      year: "2024"
    },
    {
      id: 2,
      title: "Городские пейзажи",
      category: "photography",
      image: "img/183e7062-488a-40af-ad07-27cf068f6bc2.jpg",
      description: "Серия фотографий современной архитектуры",
      year: "2024"
    },
    {
      id: 3,
      title: "Брендинг студии",
      category: "graphic",
      image: "img/fc2827d7-0940-4270-9b43-a82bfa2d9634.jpg",
      description: "Создание визуального стиля для креативной студии",
      year: "2023"
    },
    {
      id: 4,
      title: "Природа в деталях",
      category: "photography",
      image: "img/183e7062-488a-40af-ad07-27cf068f6bc2.jpg",
      description: "Макросъёмка естественных текстур",
      year: "2023"
    },
    {
      id: 5,
      title: "Концептуальные эскизы",
      category: "illustration",
      image: "img/f4ad274b-731e-4067-bb67-87d47f0526bc.jpg",
      description: "Серия концептуальных набросков и эскизов",
      year: "2024"
    },
    {
      id: 6,
      title: "Логотип коллекции",
      category: "graphic",
      image: "img/fc2827d7-0940-4270-9b43-a82bfa2d9634.jpg",
      description: "Разработка логотипа для модного бренда",
      year: "2023"
    }
  ];

  const categories = [
    { id: 'all', label: 'Все работы' },
    { id: 'illustration', label: 'Иллюстрация' },
    { id: 'photography', label: 'Фотография' },
    { id: 'graphic', label: 'Графический дизайн' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Минималистичная навигация */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-display text-xl font-light text-primary">Анна Сидорова</div>
            <div className="hidden md:flex space-x-12">
              {['Главная', 'Работы', 'О себе', 'Контакты'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['hero', 'portfolio', 'about', 'contact'][index])}
                  className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section с слайдером */}
      <section id="hero" className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <div ref={addToRefs} className="space-y-6">
                <Badge className="bg-background/90 text-primary border-border/50 backdrop-blur-sm">
                  {heroSlides[currentSlide].category}
                </Badge>
                <h1 className="lg:text-8xl font-display leading-tight text-red-900 text-8xl font-extrabold mx-0 my-3">Алёна
Кадетова</h1>
                <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
                  Создаю уникальные визуальные решения через призму современного 
                  минимализма и экспериментального подхода к форме
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-background/90 backdrop-blur-sm border-border/50 text-primary hover:bg-background/95 mt-8"
                  onClick={() => scrollToSection('portfolio')}
                >
                  Посмотреть работы
                  <Icon name="ArrowDown" className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Индикаторы слайдера */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Галерея работ */}
      <section id="portfolio" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="text-center mb-16">
            <h2 className="text-4xl font-light text-primary mb-4">Портфолио</h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">
              Коллекция избранных работ в области иллюстрации, фотографии и графического дизайна
            </p>
          </div>

          {/* Категории */}
          <div ref={addToRefs} className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={`font-light ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Сетка работ */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div 
                    ref={addToRefs}
                    className="group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden aspect-[4/5]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                      </div>
                      <CardContent className="p-6 bg-background/95 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-light text-primary">{item.title}</h3>
                          <span className="text-xs text-muted-foreground">{item.year}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto"
                    />
                    <div className="p-8 bg-background">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-light text-primary">{item.title}</h3>
                        <Badge className="bg-secondary text-secondary-foreground">
                          {item.year}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* О себе */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            <div className="relative">
              <img
                src="img/27c51ec4-4b41-4bf9-869e-61df6bf95cce.jpg"
                alt="Анна Сидорова"
                className="w-full aspect-[3/4] object-cover rounded-sm"
              />
            </div>
            <div className="space-y-8 lg:pt-16">
              <div>
                <h2 className="text-4xl font-light text-primary mb-6">О творчестве</h2>
                <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
                  <p>
                    Работаю на стыке традиционного искусства и современных цифровых технологий, 
                    исследуя возможности минималистичной эстетики и её влияния на восприятие.
                  </p>
                  <p>
                    Моя философия основана на принципе "меньше значит больше" — каждый элемент 
                    композиции должен нести смысловую нагрузку и работать на общую идею произведения.
                  </p>
                  <p>
                    Специализируюсь на создании визуальных систем для брендов, иллюстрациях 
                    и экспериментальной фотографии.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-light text-primary">Достижения</h3>
                <div className="space-y-3 text-sm text-muted-foreground font-light">
                  <div>• Персональная выставка в Галерее современного искусства, 2024</div>
                  <div>• Finalist, International Design Awards, 2023</div>
                  <div>• Работы в коллекции Музея дизайна</div>
                  <div>• Сотрудничество с ведущими креативными студиями</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-light text-primary">Образование</h3>
                <div className="text-sm text-muted-foreground font-light">
                  <div className="mb-2">Магистратура по направлению "Графический дизайн"</div>
                  <div>Московский государственный художественный институт имени В.И. Сурикова</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="text-center mb-16">
            <h2 className="text-4xl font-light text-primary mb-4">Связаться</h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">
              Открыта для новых проектов и творческого сотрудничества
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: "Mail", info: "hello@annasidorova.ru" },
                { icon: "Instagram", info: "@anna.sidorova.art" },
                { icon: "MapPin", info: "Москва, Россия" }
              ].map((contact, index) => (
                <div key={index} ref={addToRefs} className="text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-background rounded-full shadow-sm">
                    <Icon name={contact.icon as any} className="text-primary" size={20} />
                  </div>
                  <p className="text-sm text-muted-foreground font-light">{contact.info}</p>
                </div>
              ))}
            </div>

            <Card ref={addToRefs} className="border-0 shadow-sm bg-background/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light text-primary mb-2">Имя</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-muted/50 border-0 rounded-sm focus:ring-2 focus:ring-primary/20 transition-all font-light"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-primary mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full p-3 bg-muted/50 border-0 rounded-sm focus:ring-2 focus:ring-primary/20 transition-all font-light"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-primary mb-2">Сообщение</label>
                    <textarea
                      rows={4}
                      className="w-full p-3 bg-muted/50 border-0 rounded-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none font-light"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-light">
                    Отправить сообщение
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Минималистичный Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-display text-xl font-light text-primary">Анна Сидорова</div>
              <p className="text-sm text-muted-foreground font-light mt-1">Визуальный художник</p>
            </div>
            <div className="flex space-x-6">
              {[
                { icon: "Instagram", href: "#" },
                { icon: "Linkedin", href: "#" },
                { icon: "Mail", href: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <Icon name={social.icon as any} size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-border/30 mt-8 pt-8 text-center">
            <p className="text-xs text-muted-foreground font-light">
              © 2024 Анна Сидорова. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;