// form.cy.js dosyasında
describe('Form Testi', () => {
    // formun bulunduğu sayfayı ziyaret edin
    beforeEach(() => {
      cy.visit("http://localhost:3000/")
    })
  
    // isim inputunu alın ve bir isim yazan bir test kodu
    it('isim inputuna bir isim yazar', () => {
      cy.get('input[type="text"]').type('Ali')
    })
  
    // Girilen metnin sağladığınız adı içerip içermediğini kontrol etmek için bir assertion kullanan bir test kodu. (İpucu: .should assertion)
    it('isim inputunun değeri Ali olur', () => {
      cy.get('input[type="text"]').should('have.value', 'Ali')
    })
  
    // email inputunu alın ve bir email adresi girin diyen bir test kodu
    it('email inputuna bir email adresi yazar', () => {
      cy.get('input[type="email"]').type('ali@example.com')
    })
  
    // şifre inputunu alın ve bir şifre girin diyen bir test kodu
    it('şifre inputuna bir şifre yazar', () => {
      cy.get('input[type="password"]').type('123456')
    })
  
    // Kullanıcının kullanım koşulları kutusunu işaretlediğini kontrol edecek bir test kodu
    it('kullanım koşulları kutusunu işaretler', () => {
      cy.get('input[type="checkbox"]').check()
    })
  
    // Kullanıcının form verilerini gönderip gönderemeyeceğini test edecek bir test kodu
    it('form verilerini gönderir', () => {
      // formu göndermek için butona tıklar
      cy.get('button[type="submit"]').click()
      // formun yönlendirdiği sayfayı kontrol eder
      cy.url().should('include', '/success')
    })
  
    // Bir input boş bırakılırsa form doğrulamasını test edecek bir test kodu
    it('isim inputu boş bırakılırsa form doğrulanmaz', () => {
      // email, şifre ve kullanım koşulları inputlarını doldurur
      cy.get('input[type="email"]').type('ali@example.com')
      cy.get('input[type="password"]').type('123456')
      cy.get('input[type="checkbox"]').check()
      // formu göndermeye çalışır
      cy.get('button[type="submit"]').click()
      // formun gönderilmediğini ve hata mesajı gösterdiğini kontrol eder
      cy.url().should('not.include', '/success')
      cy.get('input[type="text"]').siblings('.error').should('contain', 'isim gerekli')
    })
  })
  