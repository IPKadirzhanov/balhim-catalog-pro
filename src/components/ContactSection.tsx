const ContactSection = () => {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full gradient-primary opacity-5" />
      
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
            Свяжитесь с нами
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Контакты
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 shadow-card space-y-6 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full gradient-primary opacity-15" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">BalHim</h3>
                  <p className="text-muted-foreground">Хим и хоз товары</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Адрес</h3>
                  <p className="text-muted-foreground">Т.Ц Байсат, цокольный этаж, зеленый ряд</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Телефон</h3>
                  <a href="tel:+77752400997" className="text-primary font-semibold hover:underline">
                    +7 775 240 09 97
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-card h-80 lg:h-full min-h-[320px]">
            <iframe
              src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A43.284431%2C%22lon%22%3A76.889361%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22almaty%22%7D%2C%22org%22%3A%2270000001019528816%22%7D"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="BalHim на карте 2ГИС"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
