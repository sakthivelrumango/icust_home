import { Pipe, PipeTransform } from '@angular/core';
import { orderBy, sortBy } from "lodash-es";

@Pipe({
  name: 'customTaskSummarySorting',
  pure: false
})
export class CustomTaskSummarySortingPipe implements PipeTransform {

  transform(value: any[], criteria: SortCriteria): any[] {

    if (!value || !criteria)
      return value;

    let p: string = criteria.property;

    let sortFn: (a: any, b: any) => any = (a, b) => {
      let value: number = 0;
      if (a[p] === undefined) value = -1;
      else if (b[p] === undefined) value = 1;
      else if (a[p] === null) value = -1;
      else if (b[p] === null) value = 1;
      else if (a[p] === '') value = -1;
      else if (b[p] === '') value = 1;
      else value = a[p] - b[p];
      // a[p] > b[p] ? 1 : (b[p] > a[p] ? -1 : 0);
      return criteria.descending ? (value * -1) : value;
    };


    let sortForAlpha: (a: any, b: any) => any = (a, b) => {
      let value: number = 0;
      if (a[p] === undefined) value = -1;
      else if (b[p] === undefined) value = 1;
      else if (a[p] === null) value = -1;
      else if (b[p] === null) value = 1;
      else if (a[p] === '') value = -1;
      else if (b[p] === '') value = 1;
      else value = (a[p].toLocaleLowerCase() > b[p].toLocaleLowerCase()) ? 1 :
        ((b[p].toLocaleLowerCase() > a[p].toLocaleLowerCase()) ? -1 : 0);
      return criteria.descending ? (value * -1) : value;
    };

    let sortForAlphaNumeric: (a: any, b: any) => any = (a, b) => {
      let value: number = 0;
      if (a[p] === undefined) value = -1;
      else if (b[p] === undefined) value = 1;
      else if (a[p] === null) value = -1;
      else if (b[p] === null) value = 1;
      else if (a[p] === '') value = -1;
      else if (b[p] === '') value = 1;
      else {
        var charPart = [a[p].substring(0, 4), b[p].substring(0, 4)],
          numPart = [a[p].substring(4) * 1, b[p].substring(4) * 1];
        // debugger;
        if (charPart[0] < charPart[1]) value = -1;
        else if (charPart[0] > charPart[1]) value = 1;
        else { //(charPart[0] == charPart[1]){
          if (numPart[0] < numPart[1]) value = -1;
          else if (numPart[0] > numPart[1]) value = 1;
        }
      }
      // value = a[p].toLocaleLowerCase().localeCompare(b[p].toLocaleLowerCase(), 'en', { numeric: true });
      return criteria.descending ? (value * -1) : value;

    };


    // const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
    // console.log(['A1', 'A10', 'A11', 'A12', 'A2', 'A3', 'A4', 'B10', 'B2', 'F1', 'F12', 'F3'].sort(sortAlphaNum))

    if (criteria.property === "kycReference") {
      // console.log('kycReference :: ')
      value.sort(sortForAlphaNumeric);
    }

    if (criteria.property === "firstName") {
      // console.log('firstName :: ')
      value.sort(sortForAlpha);
    } else {
      value.sort(sortFn);
    }
    return value;
  }


}

export interface SortCriteria {
  property: string;
  descending?: boolean;
}


