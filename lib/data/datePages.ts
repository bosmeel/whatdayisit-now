export type DatePage = {
  slug: string;
  year: number;
  month: number;
  day: number;
};

const MONTH_NAMES = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

function slug(month:number, day:number, year:number){
  return `${MONTH_NAMES[month-1]}-${day}-${year}`;
}

export function generateDatePages(startYear:number,endYear:number){

  const pages:DatePage[]=[];

  for(let year=startYear;year<=endYear;year++){

    for(let month=1;month<=12;month++){

      const daysInMonth=new Date(year,month,0).getDate();

      for(let day=1;day<=daysInMonth;day++){

        pages.push({
          slug:slug(month,day,year),
          year,
          month,
          day
        });

      }

    }

  }

  return pages;

}