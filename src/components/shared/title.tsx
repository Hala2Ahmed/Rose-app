import React from 'react';

type TitleProps = {
    title: string,
    heading: string,
}

const Title = ({title, heading}: TitleProps) => {
    return (
        <div className='flex flex-col gap-2 m-auto'>
            <span className='title-sub'>{title}</span>
            <span
                className="title-heading">
                {heading}
            </span>
        </div>
    )
}

export default Title;
