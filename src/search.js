import React, { Component } from 'react';


        function mySearchFunction() {
            function handleClick(e) {
              e.preventDefault();
              console.log('The link was clicked.');
            }
          
            return (
              <a href="#" onClick={handleClick}>
                Click me
              </a>
            );
          }     
        









  