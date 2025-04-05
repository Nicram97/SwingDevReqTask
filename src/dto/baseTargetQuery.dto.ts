import { IsIn, IsNotEmpty } from "class-validator";
import { CommonCurrency, currencies } from "../@types/commonCurrency";

export class BaseTargetQueryDto {
  @IsNotEmpty()
  @IsIn(currencies)
  base: CommonCurrency;

  @IsNotEmpty()
  @IsIn(currencies)
  target: CommonCurrency;
}
