import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  fluid = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`w-full mx-auto px-md md:px-lg ${fluid ? "max-w-none" : "max-w-7xl"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
