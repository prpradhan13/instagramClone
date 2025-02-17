import { View, Text, Pressable, PressableProps } from 'react-native'
import React, { ReactNode } from 'react'

interface ButtonProps extends PressableProps {
  children: ReactNode;
  className?: string;
  btnTextClassName?: string;
}

const Button = ({ children, className, btnTextClassName, ...props }: ButtonProps) => {
  return (
    <Pressable className={`p-2 bg-blue-500 justify-center items-center rounded-lg ${className}`} {...props}>
      <Text className={`text-white text-lg ${btnTextClassName}`}>{children}</Text>
    </Pressable>
  )
}

export default Button;