import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  const portfolioItems = [
    {
      title: "Ребрендинг стартапа",
      category: "Брендинг",
      description: "Создание нового визуального стиля для технологического стартапа",
      image: "img/c7efe7c3-5666-4bf2-b9db-c5973e9976c5.jpg"
    },
    {
      title: "Логотип ресторана",
      category: "Логотип",
      description: "Минималистичный логотип для премиум ресторана",
      image: "img/c7efe7c3-5666-4bf2-b9db-c5973e9976c5.jpg"
    },
    {
      title: "Корпоративная идентичность",
      category: "Брендбук",
      description: "Полная разработка фирменного стиля для IT-компании",
      image: "img/c7efe7c3-5666-4bf2-b9db-c5973e9976c5.jpg"
    },
    {
      title: "Дизайн упаковки",
      category: "Упаковка",
      description: "Креативная упаковка для эко-продуктов",
      image: "img/c7efe7c3-5666-4bf2-b9db-c5973e9976c5.jpg"
    }
  ];

  const services = [
    {
      icon: "Palette",
      title: "Брендинг",
      description: "Создание уникальной визуальной идентичности вашего бренда"
    },
    {
      icon: "Zap",
      title: "Логотипы",
      description: "Разработка запоминающихся и функциональных логотипов"
    },
    {
      icon: "Layout",
      title: "Дизайн материалов",
      description: "Визитки, флаеры, презентации и другие материалы"
    },
    {
      icon: "Package",
      title: "Дизайн упаковки",
      description: "Привлекательная упаковка, которая продает"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Навигация */}
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold font-playfair text-primary">Portfolio</h1>
            <div className="hidden md:flex space-x-8">
              {['Главная', 'О себе', 'Портфолио', 'Услуги', 'Резюме', 'Контакты'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['hero', 'about', 'portfolio', 'services', 'resume', 'contact'][index])}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-muted/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={addToRefs} className="space-y-6">
              <div className="inline-block animate-float">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                  Графический Дизайнер
                </Badge>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-playfair leading-tight">
                Создаю
                <span className="text-primary animate-pulse-color"> визуальную</span>
                <br />
                магию
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Превращаю идеи в яркие визуальные решения. Специализируюсь на брендинге, 
                логотипах и креативных материалах.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                  onClick={() => scrollToSection('portfolio')}
                >
                  Посмотреть работы
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
                  onClick={() => scrollToSection('contact')}
                >
                  Связаться
                </Button>
              </div>
            </div>
            <div ref={addToRefs} className="relative">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
                <img 
                  src="img/1d2978ce-f599-4ca6-9059-ae60391a8c02.jpg" 
                  alt="Creative Design"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary rounded-full animate-float" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-muted rounded-full animate-float" style={{animationDelay: '1s'}} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="img/02160ae9-a5f9-4b95-9344-ce790e8ad0ae.jpg" 
                alt="About me"
                className="w-full h-[600px] object-cover rounded-3xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm">лет опыта</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-4">
                  Обо мне
                </Badge>
                <h2 className="text-4xl font-bold font-playfair mb-6">
                  Превращаю идеи в визуальные решения
                </h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Привет! Я графический дизайнер с страстью к созданию уникальных 
                  визуальных решений. За 5+ лет работы помог более чем 100 брендам 
                  найти свой визуальный голос.
                </p>
                <p>
                  Моя специализация — создание логотипов, брендинг и разработка 
                  визуальных материалов, которые не только красиво выглядят, 
                  но и эффективно решают бизнес-задачи.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-6 bg-background rounded-2xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">150+</div>
                  <div className="text-sm text-muted-foreground">Проектов</div>
                </div>
                <div className="text-center p-6 bg-background rounded-2xl shadow-sm">
                  <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Портфолио
            </Badge>
            <h2 className="text-4xl font-bold font-playfair mb-4">Мои работы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Подборка лучших проектов в области брендинга и визуального дизайна
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <Card key={index} ref={addToRefs} className="group hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-secondary/10 text-secondary mb-3">
                    {item.category}
                  </Badge>
                  <h3 className="text-xl font-semibold font-playfair mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  <Button variant="ghost" className="mt-4 text-primary hover:text-primary/80 p-0">
                    Подробнее
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="text-center mb-16">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-4">
              Услуги
            </Badge>
            <h2 className="text-4xl font-bold font-playfair mb-4">Что я делаю</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг в области графического дизайна и брендинга
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} ref={addToRefs} className="group hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl group-hover:bg-primary transition-colors duration-300">
                    <Icon name={service.icon as any} className="text-primary group-hover:text-white transition-colors duration-300" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold font-playfair mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="text-center mb-16">
            <Badge className="bg-muted/50 text-muted-foreground border-muted mb-4">
              Резюме
            </Badge>
            <h2 className="text-4xl font-bold font-playfair mb-4">Опыт и навыки</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div ref={addToRefs} className="space-y-8">
              <h3 className="text-2xl font-semibold font-playfair mb-6">Опыт работы</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Старший графический дизайнер</h4>
                    <p className="text-muted-foreground">Креативная студия "Дизайн+" • 2021-2024</p>
                    <p className="mt-2 leading-relaxed">Разработка брендинга для крупных клиентов, руководство командой дизайнеров</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-3 h-3 bg-secondary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Графический дизайнер</h4>
                    <p className="text-muted-foreground">Рекламное агентство "Вектор" • 2019-2021</p>
                    <p className="mt-2 leading-relaxed">Создание рекламных материалов, логотипов и корпоративной айдентики</p>
                  </div>
                </div>
              </div>
            </div>
            <div ref={addToRefs} className="space-y-8">
              <h3 className="text-2xl font-semibold font-playfair mb-6">Навыки</h3>
              <div className="space-y-4">
                {[
                  { skill: "Adobe Photoshop", level: 95 },
                  { skill: "Adobe Illustrator", level: 90 },
                  { skill: "Adobe InDesign", level: 85 },
                  { skill: "Figma", level: 80 },
                  { skill: "Брендинг", level: 90 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.skill}</span>
                      <span className="text-muted-foreground">{item.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="text-center mb-16">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
              Контакты
            </Badge>
            <h2 className="text-4xl font-bold font-playfair mb-4">Давайте работать вместе</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Готов воплотить ваши идеи в жизнь. Свяжитесь со мной для обсуждения проекта
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: "Mail", title: "Email", info: "hello@designer.com" },
                { icon: "Phone", title: "Телефон", info: "+7 (999) 123-45-67" },
                { icon: "MapPin", title: "Локация", info: "Москва, Россия" }
              ].map((contact, index) => (
                <Card key={index} ref={addToRefs} className="text-center p-8 hover:shadow-lg transition-all duration-300">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                    <Icon name={contact.icon as any} className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{contact.title}</h3>
                  <p className="text-muted-foreground">{contact.info}</p>
                </Card>
              ))}
            </div>
            <Card ref={addToRefs} className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <textarea 
                    rows={4} 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                    Отправить сообщение
                    <Icon name="Send" className="ml-2" size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold font-playfair">Portfolio</h3>
              <p className="text-secondary-foreground/80 mt-2">Графический дизайнер</p>
            </div>
            <div className="flex space-x-6">
              {[
                { icon: "Instagram", href: "#" },
                { icon: "Linkedin", href: "#" },
                { icon: "Mail", href: "#" },
                { icon: "Phone", href: "#" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
                >
                  <Icon name={social.icon as any} className="text-secondary-foreground hover:text-white transition-colors" size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-secondary-foreground/60">
              © 2024 Portfolio. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;