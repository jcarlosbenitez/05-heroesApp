import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'images'
  //pure actualizacion de imagen consume muchos recursos
})
export class ImagesPipe implements PipeTransform {

  

  transform(heroe: Heroe): string {
    // console.log('pipe imagen')
    if(!heroe.id && !heroe.alt_img){
      return `assets/no-image.png`
    }
    
    else if (heroe.alt_img){
      return heroe.alt_img

    }else{ return `assets/heroes/${heroe.id}.jpg`;}
   
  }

}
