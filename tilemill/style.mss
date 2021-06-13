/*background-color: #AFDBF2;*/

Map {
  background-color: #ffffff;
}

#coastpoly {
  line-width:0;
  line-color:#dce6d1; 
  polygon-opacity:1;
  polygon-fill:#ffffff;
}

#coastpoly_clone_4783::line [zoom >=9]{
  line-width:1;
  line-color:#e9f0f4;
}

#bathy [zoom > 12] {
  line-color: transparent;
  polygon-opacity:1;
  polygon-fill:#ae8;
  [drval2 <= 100]{
      polygon-fill: #f3f6f6;
      line-color: #f3f6f6;
    }
  [drval2 >100][drval2 <= 250]{
      polygon-fill: #e7eeee;
      line-color: #e7eeee;
    }
  [drval2 >250][drval2 <= 500]{
      polygon-fill: #d0dede;
      line-color: #d0dede;
    }
  [drval2 >500][drval2 <= 1000]{
      polygon-fill: #c4d6d6;
      line-color: #c4d6d6;
    }
  [drval2 > 1000][drval2 <= 3000]{
      polygon-fill: #adc5c6;
      line-color: #adc5c6;
    }
  [drval2 > 3000]{
      polygon-fill:#729c9d;
      line-color: #729c9d;
    }
}

#bathy_clone_8093 [zoom<=12] {
  line-color: transparent;
  polygon-opacity:1;
  polygon-fill:#ae8;
  [drval2 <= 100]{
      polygon-fill: #f6f9fa;
      line-color: #f6f9fa;
    }
  [drval2 >100][drval2 <= 250]{
      polygon-fill: #e9f0f4;
      line-color: #e9f0f4;
    }
  [drval2 >250][drval2 <= 500]{
      polygon-fill: #d0dee6;
      line-color: #d0dee6;
    }
  [drval2 >500][drval2 <= 1000]{
      polygon-fill: #c3d5df;
      line-color: #c3d5df;
    }
  [drval2 > 1000][drval2 <= 3000]{
      polygon-fill: #b6ccd9;
      line-color: #b6ccd9;
    }
  [drval2 > 3000]{
      polygon-fill: #77a0b8;
      line-color: #77a0b8;
    }
}

#rivers [zoom>=9][zoom<=10][order>3]{
  line-color:#c3d5df;
  line-width:[order]/35
}


#rivers [zoom>10][zoom<=13][order>=2]{
  line-color:#c3d5df;
  line-width:[order]/18;
  line-smooth: 0.9;
  [zoom=12]{ line-width:[order]/35 }
  [zoom=13]{ line-width:[order]/25 }
}


#riverpoly [zoom >=5]{
  polygon-opacity:1;
  polygon-fill:#c3d5df;
}

#linzRiver [zoom >13]{
  line-opacity:1;
  line-color:#c3d5df;
  line-width:0.35;
  [zoom=13]{line-width:0.1;}
  [zoom=14]{line-width:0.25;}
  [zoom>=15]{line-width:0.5;}
}

#lake [zoom <=11]{
  polygon-opacity:1;
  polygon-fill:#dde7ed;
}

#lake_clone_3187 [zoom >=12]{
  polygon-opacity:1;
  polygon-fill:#dde7ed;
}

#nzallhs {
  raster-scaling: gaussian;
  raster-colorizer-default-mode: linear;
  raster-colorizer-default-color: transparent;
  raster-opacity: 0.3;
  raster-colorizer-stops:
  	stop(0, #000000)
    stop(100, #000000)
    stop(225, #ffffff)
	stop(255, #ffffff);
  raster-comp-op: multiply;
}

#nzall {
  raster-scaling: gaussian;
  raster-colorizer-default-mode: linear;
  raster-colorizer-default-color: transparent;
  raster-opacity: 1;
  raster-colorizer-stops:
  	stop(0, #659166)
    stop(50, #749e75)
	stop(500, #dfe6dc);
  //raster-comp-op: multiply;
}

#forest {
  polygon-opacity:1;
  polygon-fill: #507351;
  line-color:#507351;
  [zoom <= 9] {line-width:0.1;}
  [zoom > 9] {line-width:0.35;}
  [zoom > 11] {line-width:0.5;}
  //polygon-pattern-file: url("textures/rice-paper-3.png");
  //polygon-pattern-opacity: 1.0;
  //polygon-pattern-comp-op: multiply;
  //polygon-gamma: 0.25;
  }

#bathy_clone_4384 {
  line-color: transparent;
  polygon-pattern-file: url("textures/watertexture.jpg");
  polygon-pattern-opacity: 0.5;
  polygon-pattern-comp-op: multiply;
}




