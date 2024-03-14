export const base64Encoder = (str: string): string => {
    try {
        return encodeURIComponent(Buffer.from(str).toString("base64"));
    }
    catch (error) {
        console.log(`base64Encoder error: ${error.message}`);
        return "";
    }
};

export const base64Decoder = (base64: string): string => {
    try {
        return decodeURIComponent(Buffer.from(base64, "base64").toString("utf8"));
    }
    catch (error) {
        console.log(`base64Decoder error: ${error.message}`);
        return "";
    }
};

export const delay = (ms: number = 5000): Promise<void> => new Promise((resolve: (value: void | PromiseLike<void>) => void) => setTimeout(resolve, ms));
