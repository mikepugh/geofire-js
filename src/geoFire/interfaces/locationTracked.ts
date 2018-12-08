export interface LocationTracked {
	location: number[];
	distanceFromCenter: number;
	data: any;
	isInQuery: boolean;
	geohash: string;
}
