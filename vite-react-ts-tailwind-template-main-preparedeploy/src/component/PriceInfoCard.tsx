import React from 'react';
import pricetag from '../assets/icon/price-tag.svg'; // นำเข้าไฟล์ pricetag มาใช้งาน

interface Props {
  title: string;
  iconSrc: string;
  value: string;
  borderColor: string;
}

const PriceInfoCard = ({ title, iconSrc, value, borderColor }: Props) => (
  <div className={`price-info_card border-l-[${borderColor}]`}>
    <p className="text-base text-black-100">{title}</p>

    <div className="flex gap-1">
      <img src={pricetag} alt="pricetag" width={24} height={24} /> {/* ใช้ตัวแปร pricetag ที่นำเข้ามา */}
      <p className="text-2x1 font-bold text-secondary">{value}</p>
    </div>
  </div>
);

export default PriceInfoCard;
