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
        method:'POST',
        url: 'https://countries.trevorblades.com/',
        body:{
          query: countryName
        }
      }).then(response=> {
        expect(response.body.data.countries[0].name).to.be.equal("Andorra")
      })
    
  })

})