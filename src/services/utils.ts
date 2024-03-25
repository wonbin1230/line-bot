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

export const getFormatDate = (): string => {
    const systemDate: Date = new Date();
    const currentYear: number = systemDate.getFullYear();
    const currentMonth: number = systemDate.getMonth() + 1;
    const currentDate: number = systemDate.getDate();
    const currentHours: string = systemDate.getHours().toString().padStart(2, "0");
    const currentMinutes: string = systemDate.getMinutes().toString().padStart(2, "0");
    const currentSeconds: string = systemDate.getSeconds().toString().padStart(2, "0");

    return `${currentYear}/${currentMonth}/${currentDate}-${currentHours}:${currentMinutes}:${currentSeconds}`;
};
