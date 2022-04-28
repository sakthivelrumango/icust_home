import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'highcharts';

@Pipe({
  name: 'customSearchFilter'
})
export class CustomSearchFilterPipe implements PipeTransform {


  transform(items: any[], keyword: any, properties: string[], radioButtonValue: any): any[] {

    // console.log('radioButtonValue :: ', radioButtonValue);
    if (!items) return [];
    if (!keyword) return items;

    if (items != undefined) {
      return items.filter(item => {
        var itemFound: Boolean;
        for (let i = 0; i < properties.length; i++) {
          if (item[properties[i]] != undefined) {
            if (properties[i].includes(radioButtonValue)) {
              // console.log('is present :: ',properties[i].includes(radioButtonValue))
              if (isNumber(item[properties[i]])) {
                 /* when value is number type */
                let str = item[properties[i]].toString();
                if (str.indexOf(keyword.toString()) !== -1) {
                  itemFound = true;
                  break;
                }
              } else {
                /* when value is not a number type */
                if (item[properties[i]].toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1) {
                  itemFound = true;
                  break;
                }
              }
            }
          }
        }
        return itemFound;
      });
    }
  }

}
