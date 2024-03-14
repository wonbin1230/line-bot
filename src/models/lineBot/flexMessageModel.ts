import type { FlexContainer } from "@line/bot-sdk";
import type { IFlexMessageArgs } from "./lineBotModel";

export const genFlexMessageModel = (images: Array<IFlexMessageArgs>): FlexContainer => {
	if (images.length === 0) {
		return {
			type: "bubble",
			hero: {
				type: "image",
				url: "https://memeprod.ap-south-1.linodeobjects.com/user-template/085ab1802090806cdf988f1f6b75a13f.png",
				size: "full",
				aspectRatio: "10:10",
				aspectMode: "cover",
			},
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: "找不到東西RRR",
						weight: "bold",
						size: "xl",
					},
				],
			},
		};
	}
	const flexContainer: FlexContainer = {
		type: "carousel",
		contents: [],
	};
	for (let i: number = 0; i < images.length; i++) {
		const ele: IFlexMessageArgs = images[i];
		flexContainer.contents.push({
			type: "bubble",
			hero: {
				type: "image",
				url: ele.originImgUrl,
				size: "full",
				aspectRatio: "10:10",
				aspectMode: "cover",
			},
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: ele.name,
						weight: "bold",
						size: "xxl",
					},
				],
			},
			footer: {
				type: "box",
				layout: "vertical",
				spacing: "sm",
				contents: [
					{
						type: "button",
						style: "link",
						height: "sm",
						action: {
							type: "uri",
							label: "開始製作",
							uri: ele.liffUrl,
						},
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						action: {
							type: "uri",
							label: "原模板圖",
							uri: ele.originImgUrl,
						},
					},
				],
				flex: 0,
			},
		});
	}
	return flexContainer;
};
