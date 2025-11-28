import React, { useEffect, useState } from 'react';
import backgound from '../../assets/backgound/sm3.jpg';
import Searchbar from 'feature/components/Search_Bar';
import './TrackSearch.css'
import ProductCard from 'feature/components/PriceInfoCard';

export default function TrackSearch() {
  return (
    <>
      <section className="min-w-[1280px] relative w-full">
        <div className="h-[515px] relative overflow-hidden w-full" style={{ backgroundColor: 'aqua' }}>
          <div className="dwass">
            <img
              src={backgound}
              alt=""
              style={{
                height: '624px',
                width: '1920px',
              }}
            />
          </div>
          <div className="content-container">
            <div className="pnc">
              <div className="home-main-title" style={{ gap: '15px' }}>
                <h1 className="head-text flex flex-col">
                  Unleash the Power of
                  <span className="text-primary"> PriceWise </span>
                </h1>
              </div>

              <div className="home-dot-element">
                <div className="pc-home-search">
                  <Searchbar />
                </div>
              </div>
            </div>
          </div>
        </div>


        <section className="trending-section">
          <h2 className="section-text">Trending</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-16">
            <ProductCard />
          </div>
        </section>
      </section>
    </>
  );
}
