import React from 'react';
import { createPortal } from 'react-dom';
import "../css/modal.css";
const modalRoot = document.getElementById( 'modal' );
export default class Modal extends React.Component {
   constructor( props ) {
      super( props );
      this.element = document.createElement( 'div' );
      this.element.classList.add("my-modal");
   }
   componentDidMount() {
      modalRoot.appendChild( this.element );
      document.body.style.overflow = 'hidden';
   }
 
   componentWillUnmount() {
      document.body.style.overflow = 'unset';
      modalRoot.removeChild( this.element );
   }

render() {
      return createPortal( this.props.children, this.element );
   }
}