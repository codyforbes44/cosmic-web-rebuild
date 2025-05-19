
import { useEffect, useState } from "react";

interface SparkAnimationProps {
  showSparks: boolean;
}

const SparkAnimation = ({ showSparks }: SparkAnimationProps) => {
  if (!showSparks) return null;
  
  return (
    <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
      <div className="spark spark-1" aria-hidden="true"></div>
      <div className="spark spark-2" aria-hidden="true"></div>
      <div className="spark spark-3" aria-hidden="true"></div>
      <div className="spark spark-4" aria-hidden="true"></div>
      <div className="spark spark-5" aria-hidden="true"></div>
      <div className="spark spark-6" aria-hidden="true"></div>
      <div className="spark spark-7" aria-hidden="true"></div>
      <div className="node node-1" aria-hidden="true"></div>
      <div className="node node-2" aria-hidden="true"></div>
      <div className="node node-3" aria-hidden="true"></div>
      <style>
        {`
          /* Base spark styling */
          .spark {
            position: absolute;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: #8B5CF6;
            box-shadow: 0 0 8px 2px rgba(139, 92, 246, 0.7),
                        0 0 16px 5px rgba(139, 92, 246, 0.3);
            opacity: 0;
            z-index: 5;
            will-change: transform, opacity;
          }
          
          /* Trailing effect for sparks */
          .spark::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 70px;
            height: 1px;
            background: linear-gradient(to right, rgba(139, 92, 246, 0.9), rgba(139, 92, 246, 0));
            transform: translateX(-100%) translateY(-50%) rotateZ(0deg);
            transform-origin: right center;
            will-change: transform;
          }
          
          /* Node points where sparks connect */
          .node {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: rgba(139, 92, 246, 0.2);
            box-shadow: 0 0 10px 2px rgba(139, 92, 246, 0.3);
            z-index: 4;
            opacity: 0;
            will-change: opacity, transform;
          }
          
          .node-1 {
            top: 35%;
            left: 25%;
            animation: nodePulse 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 1.5s;
          }
          
          .node-2 {
            top: 65%;
            left: 60%;
            animation: nodePulse 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 2s;
          }
          
          .node-3 {
            top: 25%;
            left: 75%;
            animation: nodePulse 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 3s;
          }
          
          .spark-1 {
            top: 20%;
            left: -10px;
            animation: sparkMove1 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          }
          
          .spark-2 {
            top: 50%;
            left: -10px;
            animation: sparkMove2 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 0.5s;
          }
          
          .spark-3 {
            top: 70%;
            left: -10px;
            animation: sparkMove3 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 1s;
          }
          
          .spark-4 {
            top: 35%;
            left: -10px;
            animation: sparkMove4 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 1.7s;
          }
          
          .spark-5 {
            top: 85%;
            left: -10px;
            animation: sparkMove5 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 0.8s;
          }
          
          .spark-6 {
            top: 15%;
            left: -10px;
            animation: sparkMove6 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 2.2s;
          }
          
          .spark-7 {
            top: 60%;
            left: -10px;
            animation: sparkMove7 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 2.8s;
          }
          
          @keyframes nodePulse {
            0%, 10% { transform: scale(0); opacity: 0; }
            20% { transform: scale(1.5); opacity: 0.8; }
            30%, 90% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(0); opacity: 0; }
          }
          
          @keyframes sparkMove1 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            5% { opacity: 1; }
            20%, 40% { transform: translateX(calc(25vw + 5px)) translateY(calc(15vh)); opacity: 1; }
            60%, 80% { transform: translateX(calc(75vw)) translateY(calc(5vh)); opacity: 0.8; }
            95% { opacity: 0.6; }
            100% { transform: translateX(calc(105vw)) translateY(calc(10vh)); opacity: 0; }
          }
          
          @keyframes sparkMove2 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            8% { opacity: 1; }
            25%, 45% { transform: translateX(calc(60vw)) translateY(calc(15vh)); opacity: 0.9; }
            65%, 85% { transform: translateX(calc(80vw)) translateY(calc(-10vh)); opacity: 0.7; }
            95% { opacity: 0.5; }
            100% { transform: translateX(calc(105vw)) translateY(calc(-15vh)); opacity: 0; }
          }
          
          @keyframes sparkMove3 {
            0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; transform: translateX(calc(10vw)) translateY(calc(-5vh)) rotate(2deg); }
            40% { transform: translateX(calc(45vw)) translateY(calc(-5vh)) rotate(-2deg); opacity: 1; }
            70% { transform: translateX(calc(70vw)) translateY(calc(10vh)) rotate(1deg); opacity: 0.8; }
            95% { opacity: 0.6; }
            100% { transform: translateX(calc(105vw)) translateY(calc(15vh)) rotate(-1deg); opacity: 0; }
          }
          
          @keyframes sparkMove4 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            10% { opacity: 1; }
            20%, 30% { transform: translateX(calc(25vw)) translateY(0); opacity: 1; }
            50%, 70% { transform: translateX(calc(60vw)) translateY(calc(20vh)); opacity: 0.8; }
            95% { opacity: 0.5; }
            100% { transform: translateX(calc(105vw)) translateY(calc(-10vh)); opacity: 0; }
          }
          
          @keyframes sparkMove5 {
            0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0; }
            8% { opacity: 1; transform: translateX(calc(10vw)) translateY(calc(-8vh)) rotate(-2deg); }
            30%, 50% { transform: translateX(calc(50vw)) translateY(calc(-15vh)) rotate(3deg); opacity: 1; }
            70%, 90% { transform: translateX(calc(80vw)) translateY(calc(-20vh)) rotate(-1deg); opacity: 0.7; }
            95% { opacity: 0.4; }
            100% { transform: translateX(calc(105vw)) translateY(calc(-25vh)) rotate(2deg); opacity: 0; }
          }
          
          @keyframes sparkMove6 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            10% { opacity: 1; }
            30%, 50% { transform: translateX(calc(40vw)) translateY(calc(25vh)) rotateZ(-5deg); opacity: 0.9; }
            70%, 80% { transform: translateX(calc(75vw)) translateY(calc(-5vh)) rotateZ(5deg); opacity: 0.7; }
            95% { opacity: 0.5; }
            100% { transform: translateX(calc(105vw)) translateY(calc(5vh)); opacity: 0; }
          }
          
          @keyframes sparkMove7 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            10% { opacity: 1; }
            20%, 40% { transform: translateX(calc(30vw)) translateY(calc(5vh)); opacity: 0.9; }
            60%, 80% { transform: translateX(calc(65vw)) translateY(calc(15vh)); opacity: 0.8; }
            95% { opacity: 0.6; }
            100% { transform: translateX(calc(105vw)) translateY(calc(8vh)); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default SparkAnimation;
