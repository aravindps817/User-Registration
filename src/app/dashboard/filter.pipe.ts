import { Pipe, PipeTransform } from '@angular/core';

 @Pipe({
  name: 'filter'
 })
 export class FilterPipe implements PipeTransform {

 transform(value: any, args?: any): any {
  // added code
  if(args == null){
    return value;
   }
 // added code

   return value.filter(
     item => item.user.username.toLowerCase().indexOf(args.toLowerCase()) > -1
  );
 }

}