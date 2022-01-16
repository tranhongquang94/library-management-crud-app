import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5rem;
`

const Input = styled.input `
    border-radius: 15px;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    padding: .5rem 1rem;
    border-width: .5px;
`

const Button = styled.button `
    background-color: ${props => props.delete? "#fff6f0": "#1e90ff"};
    border-radius: 5px;
    padding: ${props => (props.edit || props.delete) ? "0.5rem 1rem" : "0.5rem"};
    cursor: pointer;
    font-size: 1.25rem;
    margin-right: ${props => props.edit ? "2rem" : "0"};

    &:hover {
        background-color: ${props => props.delete ? "#C8BFB9" : "#0072DD"};
    }
`

const Table = styled.table `
    margin: auto;
    border-spacing: 0 1rem;
`

const Td = styled.td `
    font-size: 1.25rem;
    padding: 0 2rem;
    &:not(:last-child) {
        border-right: 1px solid black;
    }
`
export {Form, Input, Button, Table, Td};