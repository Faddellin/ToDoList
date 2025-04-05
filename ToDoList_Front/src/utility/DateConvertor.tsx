
export class DateConvertor{
	static GetDateWithoutTime(date: Date){
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		const finalDate = `${day}.${month}.${year}`

		return finalDate;
	}
	static GetDateWithTime(date: Date){
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		const finalDate = `${day}.${month}.${year}`

		return date.toLocaleString();
	}
	static GetDateWithoutTimeISOFormat(date: Date){
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		const finalDate = `${year}-${month}-${day}`

		return finalDate;
	}
}