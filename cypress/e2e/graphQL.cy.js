describe('Testando Requisição GraphQL', () => {

  it('Testando Query', () => {

    const countryName = `
      query countryName {
        countries {
          name,
          code,
          capital
        }
      }`
    cy.request({
      method: 'POST',
      url: 'https://countries.trevorblades.com/',
      body: {
        query: countryName
      }
    }).then(response => {
      expect(response.body.data.countries[0].name).to.be.equal("Andorra")
    })

  })

  it('Obter Informações de um País Específico', () => {
    const query = `
      query {
        country(code: "US") {
          name
          capital
        }
      }`;

    cy.request({
      method: 'POST',
      url: 'https://countries.trevorblades.com/',
      body: { query }
    }).then(response => {
      const country = response.body.data.country;
      expect(country.name).to.be.equal("United States")
      expect(country.capital).to.be.equal("Washington D.C.")
    });
  });

  it('Listar Idiomas de Todos os Países', () => {
    const query = `
      query {
        countries {
          name
          languages {
            name
          }
        }
      }`;

    cy.request({
      method: 'POST',
      url: 'https://countries.trevorblades.com/',
      body: { query }
    }).then(response => {
      const countries = response.body.data.countries;
      countries.forEach(country => {
        // Antartica não possui linguagem, então seu array pode estar vazio
        if( country.name = "Antarctica"){
          expect(country.languages).to.be.an('array')
        }else
          expect(country.languages).to.be.an('array').that.is.not.empty;
      });
    });
  });

  it('Pesquisar Países por Nome', () => {
    //Ao usar { name: { eq: "Brazil" } }, você está fornecendo corretamente um objeto StringQueryOperatorInput para o filtro.
    const query = `
      query { 
        countries(filter: { name: { eq: "Brazil" } }) {
          name
          capital
        }
      }`;

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