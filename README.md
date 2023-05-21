# node-bic-sydney
> A Node.js module that provides some 'Bing Image Creator' functions.

## Prerequisites
- Node.js >= 16.0.0
- Sydney's optionsSets must contain 'gencontentv3' if you want bing to provide prompts for you.

## Usage

### Module
```bash
npm i @timefox/bic-sydney
```

### Usage
<details>
<summary><strong>Method 1</strong></summary>

Create images by Bing Image Creator, and get a iframe pointing to the page contains the images created.
This method is most likely what the original bing browser client does.
The format of {BingImageCreator} options is almost same as the bingAiClient options of 'node-chatgpt-api'.
```JS
import { BingImageCreator } from '@timefox/bic-sydney';

// Setup the required options.
const options = {
    // Necessary for some people in different countries, e.g. China (https://cn.bing.com)
    host: '',
    // The "_U" cookie value from bing.com
    userToken: '',
    // If the above doesn't work, provide all your cookies as a string instead
    cookies: '',
    // A proxy string like "http://<ip>:<port>"
    proxy: '',
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
    // (Optional) The user agent for the network request.
    userAgent: '',
};

// Make a creation request with given prompt. With 'gencontentv3' option on, bing will give you the prompt
// in a message which's contentType is 'IMAGE'.
const imageIframe = new BingImageCreator(options).genImageIframeCsr(prompt, messageId);
imageIframe.then((result) => {
    console.debug(result);
}).catch((error) => {
    console.debug(error);
});

```
**Note: If this iframe is returned to client browser, the user must be logged in to bing.com in order to generate the image successfully. The user's cookie is required for the polling requests of the generation process.**
</details>

<details>
<summary><strong>Method 2</strong></summary>

Create images by Bing Image Creator, and get a iframe which uses the 'srcdoc' attribute to hold the rendered result page.
**This method does not require the user to have logged in to bing.com on the client side.  The entire request process is completed by the server proxy.**
**It's very useful for the clients can not visit the new bing's service directly.**
```JS
import { BingImageCreator } from '@timefox/bic-sydney';

// Setup the required options.
const options = {
    // Necessary for some people in different countries, e.g. China (https://cn.bing.com)
    host: '',
    // The "_U" cookie value from bing.com
    userToken: '',
    // If the above doesn't work, provide all your cookies as a string instead
    cookies: '',
    // A proxy string like "http://<ip>:<port>"
    proxy: '',
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
    // (Optional) The user agent for the network request.
    userAgent: '',
};

// Make a creation request with given prompt. With 'gencontentv3' option on, bing will give you the prompt
// in a message which's contentType is 'IMAGE'.
// The onProgress is a callback function. If onProgress is provided and returns true, the request will be cancelled.
const imageIframe = await new BingImageCreator(options).genImageIframeSsr(prompt, messageId, onProgress);
imageIframe.then((result) => {
    console.debug(result);
}).catch((error) => {
    console.debug(error);
});

```

</details>

**For more usage, please refer to the module's documentation.**

## Documents
```bash
npm run doc
```

It will generate the module's docs for you under **./docs**.

## License
This project is licensed under the MIT License.