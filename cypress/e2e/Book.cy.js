describe('login spec', () => {
    beforeEach(() => {
      cy.visit("/")
    })
    it("Should successfully login", () => {
      cy.login("test@test.com", "test");
      cy.contains("Добро пожаловать test@test.com").should("be.visible");
    });
    
    it("Should not login with empty login", () => {
      cy.contains("Log in").click();
      cy.get("#mail").type(" ");
      cy.get("#pass").type("test");
      cy.contains("Submit").click();
      cy.get("#mail")
        .then(($el) => $el[0].checkValidity())
        .should("be.false");
      cy.get("#mail")
        .then(($el) => $el[0].validationMessage)
        .should("contain", "Заполните это поле.");
    });
    
    it("Should not login with empty password", () => {
      cy.contains("Log in").click();
      cy.get("#mail").type("test@test.com");
      cy.contains("Submit").click();
      cy.get("#pass")
        .then(($el) => $el[0].checkValidity())
        .should("be.false");
    });
    
  })



  const bookFirst = {
    title: "Бесконечная шутка",
    description:
      "Отправляйтесь в захватывающее интеллектуальное путешествие в поисках «Бесконечной шутки» – фильма, который способен убить любого, кто его посмотрит",
    author: "Уоллес Д.",
  };
  
  const bookSecond = {
    title: "Слепой убийца",
    description:
      "Две сестры Айрис и Лора привыкли жить под покровительством состоятельного отца.",
    author: "Этвуд М.",
  };
  
  const bookThird = {
    title: "Т",
    description:
      "Главный герой книги – граф Т., знаток боевых искусств. Он сбегает от царской охраны и отправляется в долгий путь, чтобы достичь Оптиной Пустыни.",
    author: "Виктор Пелевин",
  };
  
  describe("Favorite book spec", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login("test@test.com", "test");
    });
  
   
  
    it("Should add new book", () => {
      cy.addBook(bookFirst);
      cy.get(".card-title").should("contain.text", bookFirst.title);
    });
  
    
    it("Should add new book to favorite", () => {
      cy.addFavoriteBook(bookSecond);
      cy.visit("/favorites");
      cy.get(".card-title").should("contain.text", bookSecond.title);
    });
  
  
  
    it("Should delete book from favorite", () => {
      cy.visit("/favorites");
      cy.contains(bookSecond.title)
        .should("be.visible")
        .within(() => cy.get(".card-footer > .btn").click({ force: true }));
      cy.contains(bookSecond.title).should("not.exist");
    });
  });