/**
 * @class
 * @description A class that creates the images using the 'Bing Image Creator'.
 */
export default class BingImageCreator {
    /**
     * Get a valid IPv4 address string from input IP.
     * @param {string} ip - A fixed IPv4 address or a range of IPv4 using CIDR notation.
     * @returns {string} A valid IPv4 address or undefined.
     *                   If 'ip' is a valid fixed IPv4 address, it returns 'ip' itself.
     *                   If 'ip' is a range of IPv4 using CIDR notation, it returns a random address within the range.
     *                   Otherwise, it returns undefined.
     */
    static getValidIPv4(ip: string): string;
    /**
     * Decode the HTML entities, a very lite version.
     * @param {string} html - The HTML string to be decoded.
     * @returns {string} Decoded string.
     */
    static decodeHtmlLite(html: string): string;
    /**
     * Removes a specific HTML element and its corresponding closing tag from a web page string.
     * @param {string} html - The web page string to be processed.
     * @param {string} tag - The element tag to be removed, such as 'div'.
     * @param {string} tagId - The id of the element to be removed, such as 'giloader'.
     * @returns {string} A new web page string with the specified element and its closing tag removed.
     */
    static removeHtmlTagLite(html: string, tag: string, tagId: string): string;
    /**
     * Delay the execution for a given time in millisecond unit.
     * @param {number} ms - The time to be delayed in millisecond unit.
     * @returns {Promise} A promise object that is used to wait.
     */
    static sleep(ms: number): Promise<any>;
    /**
     * The pattern to match the inline image generation request.
     */
    static get inlineImagePattern(): RegExp;
    /**
     * Why is there such a function here? I have seen the messages with inline generative image style at a converation with bing, but only once.
     * The message contains a markdown tag like '![prompt](#generative_image)', and can appear at the middle or end of the message.
     * After starting a new conversation, I couldn't reproduce it anymore. Of course I tried various methods, but none of them works.
     * Maybe it's a new function still in testing.
     * Parse the message object or text, return the prompt for generative image if it exists.
     * @param {string|object} message - The message to parese.
     * @returns {string} The prompt for inline image generation request found in message, or undefined if it is not found.
     */
    static parseInlineGenerativeImage(message: string | object): string;
    /**
     * @constructor
     * @param {Object} options - Options for BingImageCreator.
     */
    constructor(options: any);
    /**
     * Set options for BingImageCreator.
     * @param {Object} options - Options for BingImageCreator. The format of the options is almost same as the bingAiClient options of 'node-chatgpt-api'.
     */
    setOptions(options: any): void;
    options: any;
    apiurl: string;
    telemetry: {
        config: any;
        currentKSeed: any;
        instSuffix: any;
        getNextKSeed(): any;
        getNextInstSuffix(): string;
    };
    debug: any;
    /**
     * Get fetchOptions of BingImageCreator.
     * {Object} The fetch options used for BingImageCreator.
     */
    get fetchOptions(): any;
    /**
     * @typedef {Object} BicCreationResult
     * @property {string} contentUrl - A URL pointing to the creation page.
     * @property {string} pollingUrl - The URL to poll the image creation request.
     * @property {string} contentHtml - The source code of the creation page.
     * @property {string} prompt - The prompt for the image generation.
     * @property {string} iframeid -  The message ID refers to the image generation.
     */
    /**
     * Use BIC to generate images according to the given prompt and message ID.
     * @param {string} prompt - The prompt for the image generation. It should be given by 'Sydney'.
     * @param {string} messageId - The message ID refers to the message of 'Sydney'.
     * @returns {BicCreationResult} A BicCreationResult object that contains the result of the creation.
     */
    genImagePage(prompt: string, messageId: string): {
        /**
         * - A URL pointing to the creation page.
         */
        contentUrl: string;
        /**
         * - The URL to poll the image creation request.
         */
        pollingUrl: string;
        /**
         * - The source code of the creation page.
         */
        contentHtml: string;
        /**
         * - The prompt for the image generation.
         */
        prompt: string;
        /**
         * -  The message ID refers to the image generation.
         */
        iframeid: string;
    };
    /**
     * @typedef {Object} BicProgressContext
     * @property {string} contentIframe - A iframe element points to the image creation page.
     *                                    Note: This parameter may or may not present, depending on the function you are currently calling
     *                                    or the stage of the function execution. For now, it's presented only when genImageIframeSsr calls
     *                                    the onProgress at the first time.
     * @property {Date} pollingStartTime - The start time of the polling request.
     *                                     Note: This parameter may or may not present, depending on the function you are currently calling
     *                                     or the stage of the function execution. For now, it's presented only in any 'polling' stage callbacks.
     */
    /**
     * Polling the image creation request.
     * @param {string} pollingUrl - The url to poll the image creation request.
     * @param {function({BicProgressContext}):boolean} onProgress - A callback function that will be invoked intervally during the image generation.
     *                                                              Return true to cancel creation.
     * @returns {string} The result html string which contains the generated image links.
     */
    pollingImgRequest(pollingUrl: string, onProgress: (arg0: {
        BicProgressContext: any;
    }) => boolean): string;
    /**
     * Get a list of the generated images.
     * @param {string} prompt - The prompt for the image generation. It should be given by 'Sydney'.
     * @param {string} messageId - The message ID refers to the message of 'Sydney'.
     * @param {boolean} removeSizeLimit - Set it to true to remove the parameters according to the sizes from the reslut image links.
     * @param {function({BicProgressContext}):boolean} onProgress - A callback function that will be invoked intervally during the image generation.
     *                                                              Return true to cancel creation.
     * @returns {string[]} An array containing the url strings of the generated images.
     */
    genImageList(prompt: string, messageId: string, removeSizeLimit: boolean, onProgress: (arg0: {
        BicProgressContext: any;
    }) => boolean): string[];
    /**
     * Create a html iframe element with the given src or srcdoc if isDoc is set to true.
     * @param {string} src
     * @param {boolean} isDoc
     * @returns {string} The html string of the iframe created.
     */
    createImageIframe(src: string, isDoc: boolean): string;
    /**
     * Rewrite the html by replacing the relative path with the absolute path and escaping the "'".
     * @param {string} html
     * @returns {string} The rewritten html.
     */
    rewriteHtml(html: string): string;
    /**
     * Mix the the container page and the result page, and 'render' them together into an iframe.
     * @param {string} containerHtml - The container page's html string.
     * @param {string} resultHtml - The result page's html string.
     * @returns {string} The html string of the iframe created.
     */
    renderImageIframe(containerHtml: string, resultHtml: string): string;
    /**
     * Create a server side render iframe which uses 'srcdoc' attribute to hold the rendered result page.
     * Unlike genImageIframeSsrLite, it returns an iframe that contains the full content of the result page
     * just like the original bing browser client does.
     * @param {string} prompt - The prompt for the image generation. It should be given by 'Sydney'.
     * @param {string} messageId - The message ID refers to the message of 'Sydney'.
     * @param {function({BicProgressContext}):boolean} onProgress - A callback function that will be invoked intervally during the image generation.
     *                                                              Return true to cancel creation.
     * @returns {string}
     */
    genImageIframeSsr(prompt: string, messageId: string, onProgress: (arg0: {
        BicProgressContext: any;
    }) => boolean): string;
    /**
     * Create a server side render iframe which uses 'srcdoc' attribute to hold the rendered result page.
     * Unlike genImageIframeSsr, it returns an iframe that only contains the content of the image result page.
     * @param {string} prompt - The prompt for the image generation. It should be given by 'Sydney'.
     * @param {string} messageId - The message ID refers to the message of 'Sydney'.
     * @param {function({BicProgressContext}):boolean} onProgress - A callback function that will be invoked intervally during the image generation.
     *                                                              Return true to cancel creation.
     * @returns {string} The html string of the iframe created.
     */
    genImageIframeSsrLite(prompt: string, messageId: string, onProgress: (arg0: {
        BicProgressContext: any;
    }) => boolean): string;
    /**
     * Create a client side render iframe which just points to the image creation page.
     * Note: If this element is returned to client side, the client must be logged in
     * to bing.com in order to generate the image successfully. The user's cookie is
     * required for the polling requests of the generation process.
     * @param prompt {string} - The prompt for the image generation. It should be given by 'Sydney'.
     * @param messageId {string} - The message ID refers to the message of 'Sydney'.
     * @returns {string} The html string of the iframe created.
     */
    genImageIframeCsr(prompt: string, messageId: string): string;
}
