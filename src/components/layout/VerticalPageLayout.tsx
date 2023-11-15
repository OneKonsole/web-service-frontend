import React from 'react';

/**
 * Props interface for the VerticalPageLayout component
 * @interface Props
 * @param leftComponent the left component of the layout
 * @param rightComponent the right component of the layout
 */
type Props = {
    leftComponent: React.ReactNode;
    rightComponent: React.ReactNode;
}
/**
 * VerticalPageLayout component is used to render a vertical splitted page layout
 * @param leftComponent the left component of the layout
 * @param rightComponent the right component of the layout
 * @constructor React.FC<Props>
 */
const VerticalPageLayout: React.FC<Props> = ({ leftComponent, rightComponent }: Props) => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-white flex justify-center items-center">
                {leftComponent}
            </div>
            <div className="flex-1 bg-cover bg-bottom" style={{ backgroundImage: `url(/src/assets/auth-background.png)` }}>
                {rightComponent}
            </div>
        </div>
    );
};

export default VerticalPageLayout;
