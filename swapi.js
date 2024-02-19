  const axios = require('axios');
  const { expect } = require('chai');
  const assert = require('assert');
  

  describe('Star Wars API Tests', () => {

    const swapiBaseUrl = 'https://swapi.dev/api';
    const timeoutDuration = 10000;
    const characterNames = ['Luke Skywalker']
    const filmNames = ['A New Hope']

    async function getResourceDetails(resourceName, resourceId = '') {
      try {   
        const response = await axios.get(`${swapiBaseUrl}/${resourceName}/${resourceId}`);
        // Check if the response is not null
        if (!response.data) {
          throw new Error(`Failed to retrieve details for ${resourceName}: Response is null`);
        }
        //console.log(swapiBaseUrl + resourceName + resourceId); 
        //console.log(response);
        assert.strictEqual(response.status, 200, 'Unexpected status code');
        return response;
      } catch (error) {
        throw new Error(`Failed to retrieve details for ${resourceName}: ${error.message}`);
      }
    }


    // Test Case 1: Retrieve a list of all Star Wars characters
    it('should retrieve a list of all Star Wars characters', async function () {
      this.timeout(timeoutDuration);
      try { 
        const response = await getResourceDetails('people');

      // Verify that at least one character is returned
        expect(response.data.results).to.have.length.greaterThan(0);
      } catch (error) {
      // Handle any unexpected errors
        throw new Error(`Test failed: ${error.message}`);
      }
    });


  // Test Case 2: Retrieve details for a specific Star Wars character
    characterNames.forEach(characterName => {
      it(`Should retrieve details for a specific character -  ${characterName}`, async function () {
        this.timeout(timeoutDuration);
        try {
          // Make an API request to retrieve the details for the specified character
          const response = await getResourceDetails('people', '1');

          // Verify that the response includes the correct character details
          expect(response.data.name).to.equal(characterName);

          // Verify that only one result is returned
          expect(response.data).to.not.have.property('results');
        } catch (error) {
          throw new Error(`Test failed: ${error.message}`);
        }
      });
    });


  // Test Case 3: Retrieve a list of all Star Wars films
    it('Should retrieve a list of all Star Wars films', async function () {
      this.timeout(timeoutDuration);
      try {
      // Make an API request to retrieve the list of films
        const response = await getResourceDetails('films');


        // Verify that at least one film is returned
        expect(response.data.results).to.have.length.greaterThan(0);
      } catch (error) {
        throw new Error(`Test failed: ${error.message}`);
      }
    });



  // Test Case 4: Retrieve details for a specific film
    filmNames.forEach(filmName => {
      it(`'Should retrieve details for a specific Star Wars film - ${filmName}`, async function () {
        this.timeout(timeoutDuration);
        try {
          // Make an API request to retrieve the details for the specified film
          const response = await getResourceDetails('films', '1');

          // Verify that the response includes the correct film details
          expect(response.data.title).to.equal(filmName);

          // Verify that only one result is returned
          expect(response.data).to.not.have.property('results');
        } catch (error) {
          throw new Error(`Test failed: ${error.message}`);
        }
      });
    });
  });