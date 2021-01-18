import React from 'react';
import Title from './title.styles';

interface TitleProps {
    title: string;
}

const TitleComponent: React.FC<TitleProps> = ({ title }) => {
    return (
        <Title>{ title }</Title>
    );
}

export default TitleComponent;