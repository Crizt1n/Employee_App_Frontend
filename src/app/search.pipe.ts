import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  //first Argument should be the item which have to be transformed 
  //second argument should be based on which the transformation has to be done
  transform(allEmployee: any[], searchKey: string): any[] {
    const result: any=[]

    if(!allEmployee || searchKey===""){
      return allEmployee
    }
    allEmployee.forEach((item:any)=>{
      //includes returns boolean value
      if(item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
     
    })


    return result;
  }

}
