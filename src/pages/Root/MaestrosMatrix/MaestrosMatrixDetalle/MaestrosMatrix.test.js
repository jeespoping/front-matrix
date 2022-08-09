import React from 'react'
import MaestrosMatrixDetalle from './MaestrosMatrixDetalle'
import { render, waitForElementToBeRemoved, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'; 


test('Testing para ver si el componente no devuelve vacío', () => {
    render(<MaestrosMatrixDetalle />)

    expect(screen.getByRole("column nav-1")).toHaveTextContent(/Maestros Matrix/);
    const condicionFilter = screen.getByRole("condicionFilter");
    const valueFilter = screen.getByRole("valueFilter");
    const filterText = screen.getByRole("filterText");
    userEvent.selectOptions(filterText, "Pronom");
    userEvent.selectOptions(condicionFilter, "=");
    userEvent.selectOptions(valueFilter, "RODAS BERRIO MARIA DEL SOCORRO");
    
    expect(filterText).toHaveValue("Pronom");

})
