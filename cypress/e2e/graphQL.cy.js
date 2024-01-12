describe('Testando Requisição GraphQL', () => {

  it('Testando Query', () => {

    cy.fixture('Query').then((fixtureData) => {

      const countryName = fixtureData.testFixtures

      cy.request({
        method: 'POST',
        url: 'https://countries.trevorblades.com/',
        body: {
          query: countryName
        }
      }).then(response => {
        expect(response.body.data.countries[0].name).to.be.equal("Andorra")
      });
    });

  })

  it('Obter Informações de um País Específico', () => {
    cy.fixture('Query').then((fixtureData) => {
      const query = fixtureData.codeQuery;

      cy.request({
        method: 'POST',
        url: 'https://countries.trevorblades.com/',
        body: { query }
      }).then(response => {
        const country = response.body.data.country;
        expect(country.name).to.equal("United States");
        expect(country.capital).to.equal("Washington D.C.");
      });
    });
  });

  it('Listar Idiomas de Todos os Países', () => {
    cy.fixture('Query').then((fixtureData) => {
      const query = fixtureData.languagesQuery;

      cy.request({
        method: 'POST',
        url: 'https://countries.trevorblades.com/',
        body: { query }
      }).then(response => {
        const countries = response.body.data.countries;
        countries.forEach(country => {
          // Antarctica não possui linguagem, então seu array pode estar vazio
          if (country.name === "Antarctica") {
            expect(country.languages).to.be.an('array');
          } else {
            expect(country.languages).to.be.an('array').that.is.not.empty;
          }
        });
      });
    });
  });

  it('Pesquisar Países por Nome', () => {

    cy.fixture('Query').then((fixtureData) => {
      //Ao usar { name: { eq: "Brazil" } }, você está fornecendo corretamente um objeto StringQueryOperatorInput para o filtro.
      
      const query = fixtureData.countryQuery

      cy.request({
        method: 'POST',
        url: 'https://countries.trevorblades.com/',
        body: { query }
      }).then(response => {
        const country = response.body.data.countries[0];
        expect(country.name).to.be.equal("Brazil");
      });
    });
  })

})