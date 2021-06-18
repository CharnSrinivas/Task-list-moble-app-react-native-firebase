import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("screen").width;
export const windowHeight = Dimensions.get("screen").height;

export const getPercentageofWidth=(percentage)=>
{
    return ((windowWidth/100)*percentage)
}
export const getPercentageoHeight=(percentage)=>{
    return ((windowHeight/100)*percentage)
}