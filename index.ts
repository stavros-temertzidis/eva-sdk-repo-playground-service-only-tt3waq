// StackBlitz: Import stylesheets
import './style.css';

// EVA SDK code begins here
//
import { bootstrapEndpoint } from '@springtree/eva-sdk-core-service';
import { Core } from '@springtree/eva-services-core';
import { evaAvailableServices } from '@springtree/eva-sdk-core-available-services';
import { setCoreSetting } from '@springtree/eva-sdk-core-settings';

// Activate all the default EVA service interceptors
//
evaAvailableServices.activate();

// Set our application details
//
setCoreSetting('appName', 'StackBlitzPlaygroundServicesOnly');
setCoreSetting('appVersion', '1.0.0');

// Wrap our async code so we can await it
//
(async function() {
  // StackBlitz: Output element
  const appDiv: HTMLElement = document.getElementById('app');

  // This is the recommended way to get a bootstrapped endpoint
  // If the endpoint was bootstrapped before it will not do so again unless
  // you specifically want to
  //
  const evaEndpoint = await bootstrapEndpoint({
    uri: 'https://api.vogele.test.eva-online.cloud'
  });

  try {
    // The endpoint is what you will use to make service calls
    // Service call come from a service definition package like `eva-services-core`
    //
    // Below is an example to call the parse barcode service with a payload and custom timeout value
    //
    const result = await evaEndpoint.callService(
      Core.Login,
      { Username: 'stavros.temertzidis@cgi.com', Password: '@cgi.com', SelectFirstOrganizationUnit: 'true', 
      PublicLogin: 'true'},
      { timeout: 10000 },
    );

    appDiv.innerHTML = `<h1>Service call success</h1>
    <pre>${JSON.stringify(result, null, '  ')}</pre>`;
  } catch (error) {
    console.error('Service call failed', error);

    appDiv.innerHTML = `<h1>Sevice call failed</h1>
    <pre>${JSON.stringify(error, null, '  ')}</pre>`;
  }
})();
