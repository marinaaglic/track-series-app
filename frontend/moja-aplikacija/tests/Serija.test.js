import React from 'react';	
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Serija from './Serija'
 
test('renderira sadrzaj', () => {
  const serija = {
    naziv: 'Testiranje komponenti',
    pogledano: true
  }
 
  const komponenta = render(
    <Serija serija={serija} />
  )
 
  expect(komponenta.container).toHaveTextContent('Testiranje komponenti')
  
})