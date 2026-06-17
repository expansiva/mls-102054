/// <mls fileReference="_102054_/l2/ateste.ts" enhancement="_102027_/l2/enhancementLit.ts"/>

 import { html } from 'lit'; 
 import { customElement, property } from 'lit/decorators.js';
 import { CollabLitElement } from '/_102027_/l2/collabLitElement.js';

 @customElement('ateste-102054')
 export class Ateste102054 extends CollabLitElement {
    
     @property() name: string = 'Somebody';

     render() {
         return html`<p> Hello, ${ this.name } !</p>`;
     }
 }
