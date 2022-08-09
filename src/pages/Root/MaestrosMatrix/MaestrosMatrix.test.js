import React from 'react'
import MaestrosMatrix from './MaestrosMatrix'
import { render } from '@testing-library/react'


test('Testing para ver si el componente no devuelve vacío', () => {
    render(<MaestrosMatrix />)
})
