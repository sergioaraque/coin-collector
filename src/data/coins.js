const wikiUrl = (filename) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${filename}/200px-${filename}`

export const ALL_COINS = [
  // ── ALEMANIA ──────────────────────────────────────────────────────
  { id: 'de_2006_sh',  country: 'Alemania', year: 2006, description: 'Puerta de Holstein - Schleswig-Holstein', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2006_sh.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2007_tr',  country: 'Alemania', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2007_tr.jpg', mintage: 30000000, commemorates: 'Tratado de Roma' },
  { id: 'de_2007_hh',  country: 'Alemania', year: 2007, description: 'Hamburgo - Puerta de Brandeburgo', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2007_hh.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2008_by',  country: 'Alemania', year: 2008, description: 'Baviera - Castillo de Nuremberg', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2008_by.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2009_emu', country: 'Alemania', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2009_emu.jpg', mintage: 30000000, commemorates: '10 años UEM' },
  { id: 'de_2009_sl',  country: 'Alemania', year: 2009, description: 'Sarre - Catedral de Saarbrücken', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2009_sl.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2010_hb',  country: 'Alemania', year: 2010, description: 'Bremen - Palacio de Bremen', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2010_hb.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2011_nw',  country: 'Alemania', year: 2011, description: 'NRW - Catedral de Colonia', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2011_nw.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2012_by',  country: 'Alemania', year: 2012, description: 'Baviera - Castillo de Neuschwanstein', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2012_by.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2012_eu',  country: 'Alemania', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2012_eu.jpg', mintage: 30000000, commemorates: '10 años euro' },
  { id: 'de_2013_bw',  country: 'Alemania', year: 2013, description: 'Baden-Wurtemberg - Abadía de Maulbronn', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2013_bw.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2014_ni',  country: 'Alemania', year: 2014, description: 'Baja Sajonia - Hannover', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2014_ni.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2015_ru',  country: 'Alemania', year: 2015, description: '25 años Reunificación alemana', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2015_ru.jpg', mintage: 30000000, commemorates: 'Reunificación' },
  { id: 'de_2015_he',  country: 'Alemania', year: 2015, description: 'Hessen - Puerta de Frankfurt', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2015_he.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2016_mv',  country: 'Alemania', year: 2016, description: 'Mecklemburgo - Castillo de Schwerin', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2016_mv.png', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2017_rp',  country: 'Alemania', year: 2017, description: 'Renania-Palatinado - Puerta de Maguncia', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2017_rp.png', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2018_be',  country: 'Alemania', year: 2018, description: 'Berlín - Puerta de Brandeburgo', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2018_be.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2019_br',  country: 'Alemania', year: 2019, description: '70 años Bundesrat', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2019_br.jpg', mintage: 30000000, commemorates: '70 años Bundesrat' },
  { id: 'de_2019_th',  country: 'Alemania', year: 2019, description: 'Turingia - Castillo de Wartburg', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2019_th.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2020_kn',  country: 'Alemania', year: 2020, description: 'Kniefall de Varsovia', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2020_kn.jpg', mintage: 30000000, commemorates: '50 años Kniefall' },
  { id: 'de_2020_bb',  country: 'Alemania', year: 2020, description: 'Brandeburgo - Palacio de Sanssouci', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2020_bb.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2021_st',  country: 'Alemania', year: 2021, description: 'Sajonia-Anhalt - Catedral de Magdeburgo', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2021_st.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2022_er',  country: 'Alemania', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2022_er.jpg', mintage: 30000000, commemorates: '35 años Erasmus' },
  { id: 'de_2022_hh',  country: 'Alemania', year: 2022, description: 'Hamburgo - Elbphilharmonie', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2022_hh.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },
  { id: 'de_2023_hh',  country: 'Alemania', year: 2023, description: 'Hamburgo - Speicherstadt', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2023_hh.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },

  // ── AUSTRIA ───────────────────────────────────────────────────────
  { id: 'at_2005', country: 'Austria', year: 2005, description: '50 años Tratado de Estado', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2005.jpg', mintage: 7000000, commemorates: 'Tratado de Estado 1955' },
  { id: 'at_2007', country: 'Austria', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2007.jpg', mintage: 7000000, commemorates: 'Tratado de Roma' },
  { id: 'at_2009', country: 'Austria', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2009.jpg', mintage: 7000000, commemorates: '10 años UEM' },
  { id: 'at_2012', country: 'Austria', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2012.jpg', mintage: 7000000, commemorates: '10 años euro' },
  { id: 'at_2015', country: 'Austria', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2015.jpg', mintage: 7000000, commemorates: 'Bandera UE' },
  { id: 'at_2016', country: 'Austria', year: 2016, description: '200 años Banco Nacional de Austria', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2016.jpg', mintage: 7000000, commemorates: '200 años OeNB' },
  { id: 'at_2018', country: 'Austria', year: 2018, description: '100 años República de Austria', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2018.png', mintage: 7000000, commemorates: '100 años República' },
  { id: 'at_2019', country: 'Austria', year: 2019, description: '50 años sufragio universal', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2019.jpg', mintage: 7000000, commemorates: 'Sufragio universal' },
  { id: 'at_2021', country: 'Austria', year: 2021, description: '35 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2021.jpg', mintage: 7000000, commemorates: 'Bandera UE' },
  { id: 'at_2022', country: 'Austria', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2022.jpg', mintage: 7000000, commemorates: '35 años Erasmus' },

  // ── BÉLGICA ───────────────────────────────────────────────────────
  { id: 'be_2005', country: 'Bélgica', year: 2005, description: 'Unión Económica Belgo-Luxemburguesa', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2005.jpg', mintage: 6000000, commemorates: '75 años UEBL' },
  { id: 'be_2006', country: 'Bélgica', year: 2006, description: '50 años Atomium', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2006.jpg', mintage: 5000000, commemorates: 'Atomium' },
  { id: 'be_2007', country: 'Bélgica', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2007.png', mintage: 5000000, commemorates: 'Tratado de Roma' },
  { id: 'be_2008', country: 'Bélgica', year: 2008, description: '60 años Derechos Humanos', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2008.png', mintage: 5000000, commemorates: '60 años DDHH' },
  { id: 'be_2009', country: 'Bélgica', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2009.jpg', mintage: 5000000, commemorates: '10 años UEM' },
  { id: 'be_2010', country: 'Bélgica', year: 2010, description: 'Presidencia belga de la UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2010.jpg', mintage: 5000000, commemorates: 'Presidencia UE' },
  { id: 'be_2011', country: 'Bélgica', year: 2011, description: '100 años Día Internacional de la Mujer', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2011.jpg', mintage: 5000000, commemorates: 'Día Mujer' },
  { id: 'be_2012', country: 'Bélgica', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2012.jpg', mintage: 5000000, commemorates: '10 años euro' },
  { id: 'be_2013', country: 'Bélgica', year: 2013, description: '100 años Cruz Roja de Bélgica', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2013.jpg', mintage: 5000000, commemorates: 'Cruz Roja' },
  { id: 'be_2014', country: 'Bélgica', year: 2014, description: '100 años Primera Guerra Mundial', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2014.png', mintage: 5000000, commemorates: 'WWI' },
  { id: 'be_2015', country: 'Bélgica', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2015.jpg', mintage: 5000000, commemorates: 'Bandera UE' },
  { id: 'be_2016', country: 'Bélgica', year: 2016, description: 'Batalla de Waterloo', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2016.jpg', mintage: 5000000, commemorates: 'Waterloo' },
  { id: 'be_2017', country: 'Bélgica', year: 2017, description: '200 años Universidad de Gante', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2017.jpg', mintage: 5000000, commemorates: 'Universidad Gante' },
  { id: 'be_2018', country: 'Bélgica', year: 2018, description: '50 años Mayo del 68', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2018.jpg', mintage: 5000000, commemorates: 'Mayo 68' },
  { id: 'be_2019', country: 'Bélgica', year: 2019, description: '500 años Pieter Bruegel el Viejo', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2019.jpg', mintage: 5000000, commemorates: 'Pieter Bruegel' },
  { id: 'be_2020', country: 'Bélgica', year: 2020, description: 'Año Jan Van Eyck', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2020.jpg', mintage: 5000000, commemorates: 'Jan Van Eyck' },
  { id: 'be_2022', country: 'Bélgica', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2022.jpg', mintage: 5000000, commemorates: '35 años Erasmus' },

  // ── CHIPRE ────────────────────────────────────────────────────────
  { id: 'cy_2009', country: 'Chipre', year: 2009, description: '10 años UEM', imageUrl: wikiUrl('2_euro_Cyprus_2009.png'), mintage: 1000000, commemorates: '10 años UEM' },
  { id: 'cy_2012', country: 'Chipre', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/cy_2012.jpg', mintage: 1000000, commemorates: '10 años euro' },
  { id: 'cy_2015', country: 'Chipre', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/cy_2015.png', mintage: 1000000, commemorates: 'Bandera UE' },
  { id: 'cy_2017', country: 'Chipre', year: 2017, description: 'Pafos - Capital Cultural Europea', imageUrl: wikiUrl('2_euro_Cyprus_2017.png'), mintage: 660000, commemorates: 'Pafos Capital Cultural' },
  { id: 'cy_2022', country: 'Chipre', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/cy_2022.png', mintage: 500000, commemorates: '35 años Erasmus' },

  // ── ESLOVAQUIA ────────────────────────────────────────────────────
  { id: 'sk_2009', country: 'Eslovaquia', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2009.jpg', mintage: 2000000, commemorates: '10 años UEM' },
  { id: 'sk_2011', country: 'Eslovaquia', year: 2011, description: '20 años independencia eslovaca', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2011.jpg', mintage: 1000000, commemorates: 'Independencia' },
  { id: 'sk_2012', country: 'Eslovaquia', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2012.jpg', mintage: 1000000, commemorates: '10 años euro' },
  { id: 'sk_2013', country: 'Eslovaquia', year: 2013, description: '1150 años misión Cirilo y Metodio', imageUrl: wikiUrl('2_euro_Slovakia_2013.png'), mintage: 1000000, commemorates: 'Cirilo y Metodio' },
  { id: 'sk_2014', country: 'Eslovaquia', year: 2014, description: '10 años adhesión a la UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2014.jpg', mintage: 1000000, commemorates: '10 años UE' },
  { id: 'sk_2015', country: 'Eslovaquia', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2015.jpg', mintage: 1000000, commemorates: 'Bandera UE' },
  { id: 'sk_2016', country: 'Eslovaquia', year: 2016, description: 'Presidencia eslovaca de la UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2016.jpg', mintage: 1000000, commemorates: 'Presidencia UE' },
  { id: 'sk_2018', country: 'Eslovaquia', year: 2018, description: '25 años República Eslovaca', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2018.jpg', mintage: 1000000, commemorates: 'República Eslovaca' },
  { id: 'sk_2022', country: 'Eslovaquia', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2022.jpg', mintage: 1000000, commemorates: '35 años Erasmus' },

  // ── ESLOVENIA ─────────────────────────────────────────────────────
  { id: 'si_2007', country: 'Eslovenia', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/si_2007.png', mintage: 1000000, commemorates: 'Tratado de Roma' },
  { id: 'si_2008', country: 'Eslovenia', year: 2008, description: '500 años Primoz Trubar', imageUrl: wikiUrl('2_euro_Slovenia_2008.png'), mintage: 1000000, commemorates: 'Primoz Trubar' },
  { id: 'si_2009', country: 'Eslovenia', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/si_2009.jpg', mintage: 1000000, commemorates: '10 años UEM' },
  { id: 'si_2010', country: 'Eslovenia', year: 2010, description: '200 años Jardín Botánico de Ljubljana', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/si_2010.jpg', mintage: 1000000, commemorates: 'Jardín Botánico' },
  { id: 'si_2012', country: 'Eslovenia', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Slovenia_2012.png'), mintage: 1000000, commemorates: '10 años euro' },
  { id: 'si_2013', country: 'Eslovenia', year: 2013, description: '700 años Cueva de Postojna', imageUrl: wikiUrl('2_euro_Slovenia_2013.png'), mintage: 1000000, commemorates: 'Cueva Postojna' },
  { id: 'si_2015', country: 'Eslovenia', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/si_2015.jpg', mintage: 1000000, commemorates: 'Bandera UE' },
  { id: 'si_2022', country: 'Eslovenia', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/si_2022.jpg', mintage: 1000000, commemorates: '35 años Erasmus' },

  // ── ESPAÑA ────────────────────────────────────────────────────────
  { id: 'es_2005', country: 'España', year: 2005, description: 'Don Quijote de la Mancha', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2005.jpg', mintage: 8000000, commemorates: '400 años Don Quijote' },
  { id: 'es_2007', country: 'España', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2007.png', mintage: 8000000, commemorates: 'Tratado de Roma' },
  { id: 'es_2009', country: 'España', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2009.jpg', mintage: 8000000, commemorates: '10 años UEM' },
  { id: 'es_2010', country: 'España', year: 2010, description: 'Córdoba - Capital Europea de la Cultura', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2010.jpg', mintage: 8000000, commemorates: 'Capital Cultura' },
  { id: 'es_2011', country: 'España', year: 2011, description: 'Alhambra de Granada', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2011.jpg', mintage: 7500000, commemorates: 'UNESCO - Alhambra' },
  { id: 'es_2012', country: 'España', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2012.jpg', mintage: 8000000, commemorates: '10 años euro' },
  { id: 'es_2013', country: 'España', year: 2013, description: 'El Escorial', imageUrl: wikiUrl('2_euro_Spain_2013.png'), mintage: 7000000, commemorates: 'UNESCO - Escorial' },
  { id: 'es_2014', country: 'España', year: 2014, description: 'Proclamación del Rey Felipe VI', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2014.jpg', mintage: 8000000, commemorates: 'Rey Felipe VI' },
  { id: 'es_2015', country: 'España', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2015.jpg', mintage: 7000000, commemorates: 'Bandera UE' },
  { id: 'es_2016', country: 'España', year: 2016, description: '400 años muerte de Cervantes', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2016.jpg', mintage: 7000000, commemorates: 'Miguel de Cervantes' },
  { id: 'es_2017', country: 'España', year: 2017, description: 'Castillo de Loarre', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2017.jpg', mintage: 7000000, commemorates: 'Castillo Loarre' },
  { id: 'es_2018', country: 'España', year: 2018, description: 'Catedral de Santiago de Compostela', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2018.jpg', mintage: 7000000, commemorates: 'Santiago de Compostela' },
  { id: 'es_2019', country: 'España', year: 2019, description: 'Cueva de Altamira', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2019.jpg', mintage: 7000000, commemorates: 'UNESCO - Altamira' },
  { id: 'es_2020', country: 'España', year: 2020, description: 'Parque Nacional de Garajonay', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2020.jpg', mintage: 6000000, commemorates: 'UNESCO - Garajonay' },
  { id: 'es_2021', country: 'España', year: 2021, description: 'Paseo del Prado y Retiro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2021.png', mintage: 6000000, commemorates: 'UNESCO - Prado' },
  { id: 'es_2022', country: 'España', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2022.jpg', mintage: 6000000, commemorates: '35 años Erasmus' },
  { id: 'es_2023', country: 'España', year: 2023, description: 'Medina Azahara', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2023.jpg', mintage: 6000000, commemorates: 'UNESCO - Medina Azahara' },

  // ── ESTONIA ───────────────────────────────────────────────────────
  { id: 'ee_2012', country: 'Estonia', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Estonia_2012.png'), mintage: 1000000, commemorates: '10 años euro' },
  { id: 'ee_2015', country: 'Estonia', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ee_2015.jpg', mintage: 1000000, commemorates: 'Bandera UE' },
  { id: 'ee_2017', country: 'Estonia', year: 2017, description: '100 años independencia de Estonia', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ee_2017.jpg', mintage: 1000000, commemorates: '100 años independencia' },
  { id: 'ee_2018', country: 'Estonia', year: 2018, description: '100 años independencia países bálticos', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ee_2018.jpg', mintage: 1000000, commemorates: 'Centenario Báltico' },
  { id: 'ee_2022', country: 'Estonia', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Estonia_2022.png'), mintage: 1000000, commemorates: '35 años Erasmus' },

  // ── FINLANDIA ─────────────────────────────────────────────────────
  { id: 'fi_2004', country: 'Finlandia', year: 2004, description: 'Ampliación de la UE', imageUrl: wikiUrl('2_euro_Finland_2004.png'), mintage: 1000000, commemorates: 'Ampliación UE' },
  { id: 'fi_2005', country: 'Finlandia', year: 2005, description: '60 años Naciones Unidas', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fi_2005.jpg', mintage: 2000000, commemorates: '60 años ONU' },
  { id: 'fi_2006', country: 'Finlandia', year: 2006, description: '150 años Declaración de Helsinki', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fi_2006.jpg', mintage: 2500000, commemorates: 'Declaración Helsinki' },
  { id: 'fi_2007', country: 'Finlandia', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fi_2007.jpg', mintage: 2500000, commemorates: 'Tratado de Roma' },
  { id: 'fi_2009', country: 'Finlandia', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fi_2009.jpg', mintage: 2500000, commemorates: '10 años UEM' },
  { id: 'fi_2010', country: 'Finlandia', year: 2010, description: '150 años Banco de Finlandia', imageUrl: wikiUrl('2_euro_Finland_2010.png'), mintage: 2000000, commemorates: 'Banco Finlandia' },
  { id: 'fi_2012', country: 'Finlandia', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Finland_2012.png'), mintage: 1500000, commemorates: '10 años euro' },
  { id: 'fi_2015', country: 'Finlandia', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fi_2015.jpg', mintage: 1500000, commemorates: 'Bandera UE' },
  { id: 'fi_2017', country: 'Finlandia', year: 2017, description: '100 años independencia de Finlandia', imageUrl: wikiUrl('2_euro_Finland_2017.png'), mintage: 1500000, commemorates: '100 años Finlandia' },
  { id: 'fi_2022', country: 'Finlandia', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Finland_2022.png'), mintage: 1500000, commemorates: '35 años Erasmus' },

  // ── FRANCIA ───────────────────────────────────────────────────────
  { id: 'fr_2005', country: 'Francia', year: 2005, description: '60 años Naciones Unidas', imageUrl: wikiUrl('2_euro_France_2005.png'), mintage: 10000000, commemorates: '60 años ONU' },
  { id: 'fr_2007', country: 'Francia', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2007.png', mintage: 10000000, commemorates: 'Tratado de Roma' },
  { id: 'fr_2008', country: 'Francia', year: 2008, description: 'Presidencia francesa de la UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2008.png', mintage: 10000000, commemorates: 'Presidencia UE' },
  { id: 'fr_2009', country: 'Francia', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2009.png', mintage: 10000000, commemorates: '10 años UEM' },
  { id: 'fr_2010', country: 'Francia', year: 2010, description: '100 años Charles de Gaulle', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2010.png', mintage: 10000000, commemorates: 'De Gaulle' },
  { id: 'fr_2012', country: 'Francia', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2012.png', mintage: 10000000, commemorates: '10 años euro' },
  { id: 'fr_2013', country: 'Francia', year: 2013, description: '150 años Pierre de Coubertin', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2013.png', mintage: 10000000, commemorates: 'Pierre de Coubertin' },
  { id: 'fr_2014', country: 'Francia', year: 2014, description: '70 años Desembarco de Normandía', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2014.png', mintage: 10000000, commemorates: 'Día D' },
  { id: 'fr_2015', country: 'Francia', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2015.png', mintage: 10000000, commemorates: 'Bandera UE' },
  { id: 'fr_2015b', country: 'Francia', year: 2015, description: 'Museo del Louvre', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2015b.png', mintage: 10000000, commemorates: 'Louvre' },
  { id: 'fr_2017', country: 'Francia', year: 2017, description: '100 años Auguste Rodin', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2017.png', mintage: 10000000, commemorates: 'Auguste Rodin' },
  { id: 'fr_2018', country: 'Francia', year: 2018, description: 'Simone Veil', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2018.png', mintage: 10000000, commemorates: 'Simone Veil' },
  { id: 'fr_2020', country: 'Francia', year: 2020, description: '100 años fallecimiento Claude Monet', imageUrl: wikiUrl('2_euro_France_2020.png'), mintage: 10000000, commemorates: 'Claude Monet' },
  { id: 'fr_2021', country: 'Francia', year: 2021, description: 'COVID-19 - Héroes sanitarios', imageUrl: wikiUrl('2_euro_France_2021.png'), mintage: 10000000, commemorates: 'Héroes COVID' },
  { id: 'fr_2022', country: 'Francia', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_France_2022.png'), mintage: 10000000, commemorates: '35 años Erasmus' },
  { id: 'fr_2023', country: 'Francia', year: 2023, description: 'Juegos Olímpicos París 2024', imageUrl: wikiUrl('2_euro_France_2023.png'), mintage: 10000000, commemorates: 'JJOO 2024' },

  // ── GRECIA ────────────────────────────────────────────────────────
  { id: 'gr_2004', country: 'Grecia', year: 2004, description: 'Juegos Olímpicos Atenas 2004', imageUrl: wikiUrl('2_euro_Greece_2004.png'), mintage: 6000000, commemorates: 'JJOO Atenas' },
  { id: 'gr_2007', country: 'Grecia', year: 2007, description: '50 años Tratado de Roma', imageUrl: wikiUrl('2_euro_Greece_2007.png'), mintage: 4000000, commemorates: 'Tratado de Roma' },
  { id: 'gr_2009', country: 'Grecia', year: 2009, description: '10 años UEM', imageUrl: wikiUrl('2_euro_Greece_2009.png'), mintage: 4000000, commemorates: '10 años UEM' },
  { id: 'gr_2010', country: 'Grecia', year: 2010, description: '2500 años Batalla de Maratón', imageUrl: wikiUrl('2_euro_Greece_2010.png'), mintage: 3000000, commemorates: 'Maratón' },
  { id: 'gr_2011', country: 'Grecia', year: 2011, description: '2500 años Batalla de Salamina', imageUrl: wikiUrl('2_euro_Greece_2011.png'), mintage: 3000000, commemorates: 'Salamina' },
  { id: 'gr_2012', country: 'Grecia', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Greece_2012.png'), mintage: 3000000, commemorates: '10 años euro' },
  { id: 'gr_2013', country: 'Grecia', year: 2013, description: '2400 años Academia de Platón', imageUrl: wikiUrl('2_euro_Greece_2013.png'), mintage: 3000000, commemorates: 'Platón' },
  { id: 'gr_2015', country: 'Grecia', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/gr_2015.jpg', mintage: 2500000, commemorates: 'Bandera UE' },
  { id: 'gr_2022', country: 'Grecia', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Greece_2022.png'), mintage: 2000000, commemorates: '35 años Erasmus' },

  // ── IRLANDA ───────────────────────────────────────────────────────
  { id: 'ie_2007', country: 'Irlanda', year: 2007, description: '50 años Tratado de Roma', imageUrl: wikiUrl('2_euro_Ireland_2007.png'), mintage: 5000000, commemorates: 'Tratado de Roma' },
  { id: 'ie_2009', country: 'Irlanda', year: 2009, description: '10 años UEM', imageUrl: wikiUrl('2_euro_Ireland_2009.png'), mintage: 5000000, commemorates: '10 años UEM' },
  { id: 'ie_2012', country: 'Irlanda', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Ireland_2012.png'), mintage: 5000000, commemorates: '10 años euro' },
  { id: 'ie_2015', country: 'Irlanda', year: 2015, description: '30 años Bandera UE', imageUrl: wikiUrl('2_euro_Ireland_2015.png'), mintage: 5000000, commemorates: 'Bandera UE' },
  { id: 'ie_2016', country: 'Irlanda', year: 2016, description: '100 años Alzamiento de Pascua', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ie_2016.jpg', mintage: 5000000, commemorates: 'Pascua 1916' },
  { id: 'ie_2022', country: 'Irlanda', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ie_2022.jpg', mintage: 5000000, commemorates: '35 años Erasmus' },

  // ── ITALIA ────────────────────────────────────────────────────────
  { id: 'it_2004', country: 'Italia', year: 2004, description: 'Conferencia Mundial de Alimentación FAO', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2004.jpg', mintage: 16000000, commemorates: 'FAO' },
  { id: 'it_2005', country: 'Italia', year: 2005, description: '50 años Constitución italiana', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2005.jpg', mintage: 16000000, commemorates: 'Constitución Italia' },
  { id: 'it_2006', country: 'Italia', year: 2006, description: 'Juegos Olímpicos de Invierno Turín', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2006.jpg', mintage: 18000000, commemorates: 'JJOO Turín' },
  { id: 'it_2007', country: 'Italia', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2007.png', mintage: 20000000, commemorates: 'Tratado de Roma' },
  { id: 'it_2009', country: 'Italia', year: 2009, description: '10 años UEM - Luigi Einaudi', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2009.jpg', mintage: 10000000, commemorates: '10 años UEM' },
  { id: 'it_2010', country: 'Italia', year: 2010, description: '200 años Camillo di Cavour', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2010.jpg', mintage: 5000000, commemorates: 'Cavour' },
  { id: 'it_2011', country: 'Italia', year: 2011, description: '150 años Unificación de Italia', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2011.jpg', mintage: 5000000, commemorates: 'Unificación Italia' },
  { id: 'it_2012', country: 'Italia', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2012.jpg', mintage: 15000000, commemorates: '10 años euro' },
  { id: 'it_2013', country: 'Italia', year: 2013, description: '200 años Giuseppe Verdi', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2013.jpg', mintage: 5000000, commemorates: 'Giuseppe Verdi' },
  { id: 'it_2014', country: 'Italia', year: 2014, description: 'Galileo Galilei', imageUrl: wikiUrl('2_euro_Italy_2014.png'), mintage: 5000000, commemorates: 'Galileo' },
  { id: 'it_2015', country: 'Italia', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2015.jpg', mintage: 5000000, commemorates: 'Bandera UE' },
  { id: 'it_2015b', country: 'Italia', year: 2015, description: '750 años Dante Alighieri', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2015b.jpg', mintage: 5000000, commemorates: 'Dante Alighieri' },
  { id: 'it_2016', country: 'Italia', year: 2016, description: 'Plauto - 2200 años', imageUrl: wikiUrl('2_euro_Italy_2016.png'), mintage: 5000000, commemorates: 'Plauto' },
  { id: 'it_2017', country: 'Italia', year: 2017, description: 'Tito Livio - 2000 años', imageUrl: wikiUrl('2_euro_Italy_2017.png'), mintage: 5000000, commemorates: 'Tito Livio' },
  { id: 'it_2018', country: 'Italia', year: 2018, description: '420 años Gian Lorenzo Bernini', imageUrl: wikiUrl('2_euro_Italy_2018.png'), mintage: 5000000, commemorates: 'Bernini' },
  { id: 'it_2019', country: 'Italia', year: 2019, description: '500 años Leonardo da Vinci', imageUrl: wikiUrl('2_euro_Italy_2019.png'), mintage: 5000000, commemorates: 'Leonardo da Vinci' },
  { id: 'it_2020', country: 'Italia', year: 2020, description: '500 años muerte de Rafael', imageUrl: wikiUrl('2_euro_Italy_2020.png'), mintage: 5000000, commemorates: 'Rafael Sanzio' },
  { id: 'it_2021', country: 'Italia', year: 2021, description: '700 años muerte Dante Alighieri', imageUrl: wikiUrl('2_euro_Italy_2021.png'), mintage: 5000000, commemorates: '700 años Dante' },
  { id: 'it_2022', country: 'Italia', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Italy_2022.png'), mintage: 5000000, commemorates: '35 años Erasmus' },

  // ── LETONIA ───────────────────────────────────────────────────────
  { id: 'lv_2014', country: 'Letonia', year: 2014, description: 'Riga - Capital Europea de la Cultura', imageUrl: wikiUrl('2_euro_Latvia_2014.png'), mintage: 1000000, commemorates: 'Riga Capital Cultural' },
  { id: 'lv_2015', country: 'Letonia', year: 2015, description: '30 años Bandera UE', imageUrl: wikiUrl('2_euro_Latvia_2015.png'), mintage: 1000000, commemorates: 'Bandera UE' },
  { id: 'lv_2018', country: 'Letonia', year: 2018, description: '100 años independencia de Letonia', imageUrl: wikiUrl('2_euro_Latvia_2018.png'), mintage: 1000000, commemorates: '100 años independencia' },
  { id: 'lv_2022', country: 'Letonia', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Latvia_2022.png'), mintage: 1000000, commemorates: '35 años Erasmus' },

  // ── LITUANIA ──────────────────────────────────────────────────────
  { id: 'lt_2015', country: 'Lituania', year: 2015, description: '30 años Bandera UE', imageUrl: wikiUrl('2_euro_Lithuania_2015.png'), mintage: 1000000, commemorates: 'Bandera UE' },
  { id: 'lt_2017', country: 'Lituania', year: 2017, description: 'Vilna - Capital Europea de la Cultura', imageUrl: wikiUrl('2_euro_Lithuania_2017.png'), mintage: 1000000, commemorates: 'Vilnius Capital' },
  { id: 'lt_2018', country: 'Lituania', year: 2018, description: '100 años independencia de Lituania', imageUrl: wikiUrl('2_euro_Lithuania_2018.png'), mintage: 1000000, commemorates: '100 años independencia' },
  { id: 'lt_2022', country: 'Lituania', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Lithuania_2022.png'), mintage: 1000000, commemorates: '35 años Erasmus' },

  // ── LUXEMBURGO ────────────────────────────────────────────────────
  { id: 'lu_2004', country: 'Luxemburgo', year: 2004, description: 'Monograma Grand Duke Henri', imageUrl: wikiUrl('2_euro_Luxembourg_2004.png'), mintage: 1200000, commemorates: 'Grand Duke Henri' },
  { id: 'lu_2005', country: 'Luxemburgo', year: 2005, description: '50 años independencia', imageUrl: wikiUrl('2_euro_Luxembourg_2005.png'), mintage: 1200000, commemorates: 'Independencia' },
  { id: 'lu_2007', country: 'Luxemburgo', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/lu_2007.jpg', mintage: 1200000, commemorates: 'Tratado de Roma' },
  { id: 'lu_2009', country: 'Luxemburgo', year: 2009, description: '10 años UEM', imageUrl: wikiUrl('2_euro_Luxembourg_2009.png'), mintage: 1200000, commemorates: '10 años UEM' },
  { id: 'lu_2010', country: 'Luxemburgo', year: 2010, description: 'Escudo de Armas de Luxemburgo', imageUrl: wikiUrl('2_euro_Luxembourg_2010.png'), mintage: 1200000, commemorates: 'Escudo Armas' },
  { id: 'lu_2012', country: 'Luxemburgo', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Luxembourg_2012.png'), mintage: 1200000, commemorates: '10 años euro' },
  { id: 'lu_2013', country: 'Luxemburgo', year: 2013, description: '150 años Himno Nacional', imageUrl: wikiUrl('2_euro_Luxembourg_2013.png'), mintage: 700000, commemorates: 'Himno Nacional' },
  { id: 'lu_2015', country: 'Luxemburgo', year: 2015, description: '30 años Bandera UE', imageUrl: wikiUrl('2_euro_Luxembourg_2015.png'), mintage: 700000, commemorates: 'Bandera UE' },
  { id: 'lu_2022', country: 'Luxemburgo', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Luxembourg_2022.png'), mintage: 700000, commemorates: '35 años Erasmus' },

  // ── MALTA ─────────────────────────────────────────────────────────
  { id: 'mt_2009', country: 'Malta', year: 2009, description: '10 años UEM', imageUrl: wikiUrl('2_euro_Malta_2009.png'), mintage: 1500000, commemorates: '10 años UEM' },
  { id: 'mt_2012', country: 'Malta', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Malta_2012.png'), mintage: 1500000, commemorates: '10 años euro' },
  { id: 'mt_2013', country: 'Malta', year: 2013, description: 'Barca tradicional Dgħajsa', imageUrl: wikiUrl('2_euro_Malta_2013.png'), mintage: 1500000, commemorates: 'Cultura maltesa' },
  { id: 'mt_2014', country: 'Malta', year: 2014, description: '50 años independencia de Malta', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/mt_2014.png', mintage: 1500000, commemorates: 'Independencia' },
  { id: 'mt_2015', country: 'Malta', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/mt_2015.jpg', mintage: 1500000, commemorates: 'Bandera UE' },
  { id: 'mt_2016', country: 'Malta', year: 2016, description: 'Templos de Ta Hagrat', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/mt_2016.jpg', mintage: 1500000, commemorates: 'Templos prehistóricos' },
  { id: 'mt_2017', country: 'Malta', year: 2017, description: 'Templo de Hagar Qim', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/mt_2017.jpg', mintage: 1500000, commemorates: 'Hagar Qim' },
  { id: 'mt_2022', country: 'Malta', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/mt_2022.jpg', mintage: 1500000, commemorates: '35 años Erasmus' },

  // ── MÓNACO ────────────────────────────────────────────────────────
  { id: 'mc_2007', country: 'Mónaco', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/mc_2007.jpg', mintage: 20001, commemorates: 'Tratado de Roma' },
  { id: 'mc_2012', country: 'Mónaco', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Monaco_2012.png'), mintage: 9000, commemorates: '10 años euro' },
  { id: 'mc_2015', country: 'Mónaco', year: 2015, description: '30 años Bandera UE', imageUrl: wikiUrl('2_euro_Monaco_2015.png'), mintage: 9001, commemorates: 'Bandera UE' },
  { id: 'mc_2022', country: 'Mónaco', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Monaco_2022.png'), mintage: 15000, commemorates: '35 años Erasmus' },

  // ── PAÍSES BAJOS ──────────────────────────────────────────────────
  { id: 'nl_2007', country: 'Países Bajos', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/nl_2007.png', mintage: 8000000, commemorates: 'Tratado de Roma' },
  { id: 'nl_2009', country: 'Países Bajos', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/nl_2009.jpg', mintage: 5000000, commemorates: '10 años UEM' },
  { id: 'nl_2011', country: 'Países Bajos', year: 2011, description: '500 años Erasmo de Rotterdam', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/nl_2011.jpg', mintage: 5000000, commemorates: 'Erasmo Rotterdam' },
  { id: 'nl_2012', country: 'Países Bajos', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/nl_2012.jpg', mintage: 5000000, commemorates: '10 años euro' },
  { id: 'nl_2013', country: 'Países Bajos', year: 2013, description: 'Abdicación de la Reina Beatriz', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/nl_2013.jpg', mintage: 5000000, commemorates: 'Reina Beatriz' },
  { id: 'nl_2015', country: 'Países Bajos', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/nl_2015.jpg', mintage: 5000000, commemorates: 'Bandera UE' },
  { id: 'nl_2022', country: 'Países Bajos', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/nl_2022.jpg', mintage: 5000000, commemorates: '35 años Erasmus' },

  // ── PORTUGAL ──────────────────────────────────────────────────────
  { id: 'pt_2007', country: 'Portugal', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/pt_2007.jpg', mintage: 6000000, commemorates: 'Tratado de Roma' },
  { id: 'pt_2009', country: 'Portugal', year: 2009, description: '10 años UEM', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/pt_2009.jpg', mintage: 6000000, commemorates: '10 años UEM' },
  { id: 'pt_2010', country: 'Portugal', year: 2010, description: '500 años Fernão de Magalhães', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/pt_2010.jpg', mintage: 6000000, commemorates: 'Magallanes' },
  { id: 'pt_2012', country: 'Portugal', year: 2012, description: '10 años del euro', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/pt_2012.jpg', mintage: 6000000, commemorates: '10 años euro' },
  { id: 'pt_2013', country: 'Portugal', year: 2013, description: '250 años Torre de Clérigos', imageUrl: wikiUrl('2_euro_Portugal_2013.png'), mintage: 6000000, commemorates: 'Torre Clérigos' },
  { id: 'pt_2015', country: 'Portugal', year: 2015, description: '30 años Bandera UE', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/pt_2015.png', mintage: 6000000, commemorates: 'Bandera UE' },
  { id: 'pt_2017', country: 'Portugal', year: 2017, description: 'Monasterio de los Jerónimos', imageUrl: wikiUrl('2_euro_Portugal_2017.png'), mintage: 6000000, commemorates: 'Jerónimos' },
  { id: 'pt_2019', country: 'Portugal', year: 2019, description: '150 años Cruz Roja portuguesa', imageUrl: wikiUrl('2_euro_Portugal_2019.png'), mintage: 6000000, commemorates: 'Cruz Roja' },
  { id: 'pt_2021', country: 'Portugal', year: 2021, description: 'Presidencia portuguesa de la UE', imageUrl: wikiUrl('2_euro_Portugal_2021.png'), mintage: 6000000, commemorates: 'Presidencia UE' },
  { id: 'pt_2022', country: 'Portugal', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Portugal_2022.png'), mintage: 6000000, commemorates: '35 años Erasmus' },

  // ── SAN MARINO ────────────────────────────────────────────────────
  { id: 'sm_2004', country: 'San Marino', year: 2004, description: 'Bartolomeo Borghesi', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sm_2004.jpg', mintage: 110000, commemorates: 'Bartolomeo Borghesi' },
  { id: 'sm_2005', country: 'San Marino', year: 2005, description: 'Galileo Galilei', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sm_2005.jpg', mintage: 130000, commemorates: 'Galileo' },
  { id: 'sm_2007', country: 'San Marino', year: 2007, description: '50 años Tratado de Roma', imageUrl: wikiUrl('2_euro_San_Marino_2007.png'), mintage: 120000, commemorates: 'Tratado de Roma' },
  { id: 'sm_2009', country: 'San Marino', year: 2009, description: '10 años UEM', imageUrl: wikiUrl('2_euro_San_Marino_2009.png'), mintage: 120000, commemorates: '10 años UEM' },
  { id: 'sm_2010', country: 'San Marino', year: 2010, description: 'Sandro Botticelli', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sm_2010.jpg', mintage: 120000, commemorates: 'Botticelli' },
  { id: 'sm_2012', country: 'San Marino', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_San_Marino_2012.png'), mintage: 120000, commemorates: '10 años euro' },
  { id: 'sm_2013', country: 'San Marino', year: 2013, description: '500 años Piero della Francesca', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sm_2013.jpg', mintage: 65000, commemorates: 'Piero della Francesca' },
  { id: 'sm_2015', country: 'San Marino', year: 2015, description: '30 años Bandera UE', imageUrl: wikiUrl('2_euro_San_Marino_2015.png'), mintage: 65000, commemorates: 'Bandera UE' },
  { id: 'sm_2016', country: 'San Marino', year: 2016, description: 'Donatello', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sm_2016.jpg', mintage: 62000, commemorates: 'Donatello' },
  { id: 'sm_2017', country: 'San Marino', year: 2017, description: '500 años Tintoretto', imageUrl: wikiUrl('2_euro_San_Marino_2017.png'), mintage: 62000, commemorates: 'Tintoretto' },
  { id: 'sm_2019', country: 'San Marino', year: 2019, description: 'Flora de Tiziano', imageUrl: wikiUrl('2_euro_San_Marino_2019.png'), mintage: 62000, commemorates: 'Tiziano' },
  { id: 'sm_2022', country: 'San Marino', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_San_Marino_2022.png'), mintage: 62000, commemorates: '35 años Erasmus' },

  // ── VATICANO ──────────────────────────────────────────────────────
  { id: 'va_2004', country: 'Vaticano', year: 2004, description: 'Sede Vacante 2004', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/va_2004.jpg', mintage: 85000, commemorates: 'Sede Vacante' },
  { id: 'va_2005', country: 'Vaticano', year: 2005, description: 'Muerte Juan Pablo II', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/va_2005.png', mintage: 85000, commemorates: 'Juan Pablo II' },
  { id: 'va_2006', country: 'Vaticano', year: 2006, description: 'Papa Benedicto XVI', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/va_2006.jpg', mintage: 100000, commemorates: 'Benedicto XVI' },
  { id: 'va_2007', country: 'Vaticano', year: 2007, description: '50 años Tratado de Roma', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/va_2007.jpg', mintage: 100000, commemorates: 'Tratado de Roma' },
  { id: 'va_2008', country: 'Vaticano', year: 2008, description: 'Año de San Pablo', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/va_2008.jpg', mintage: 100000, commemorates: 'San Pablo' },
  { id: 'va_2009', country: 'Vaticano', year: 2009, description: '10 años UEM', imageUrl: wikiUrl('2_euro_Vatican_2009.png'), mintage: 100000, commemorates: '10 años UEM' },
  { id: 'va_2011', country: 'Vaticano', year: 2011, description: 'Jornada Mundial de la Juventud', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/va_2011.jpg', mintage: 100000, commemorates: 'JMJ' },
  { id: 'va_2012', country: 'Vaticano', year: 2012, description: '10 años del euro', imageUrl: wikiUrl('2_euro_Vatican_2012.png'), mintage: 100000, commemorates: '10 años euro' },
  { id: 'va_2013', country: 'Vaticano', year: 2013, description: 'Cónclave - Sede Vacante', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/va_2013.jpg', mintage: 100000, commemorates: 'Cónclave 2013' },
  { id: 'va_2015', country: 'Vaticano', year: 2015, description: '30 años Bandera UE', imageUrl: wikiUrl('2_euro_Vatican_2015.png'), mintage: 100000, commemorates: 'Bandera UE' },
  { id: 'va_2016', country: 'Vaticano', year: 2016, description: 'Año de la Misericordia', imageUrl: wikiUrl('2_euro_Vatican_2016.png'), mintage: 100000, commemorates: 'Misericordiae Vultus' },
  { id: 'va_2017', country: 'Vaticano', year: 2017, description: '500 años Guardia Suiza', imageUrl: wikiUrl('2_euro_Vatican_2017.png'), mintage: 100000, commemorates: 'Guardia Suiza' },
  { id: 'va_2019', country: 'Vaticano', year: 2019, description: 'JMJ Panamá', imageUrl: wikiUrl('2_euro_Vatican_2019.png'), mintage: 100000, commemorates: 'Jornada Mundial Juventud' },
  { id: 'va_2022', country: 'Vaticano', year: 2022, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/va_2022.png', mintage: 85000, commemorates: '35 años Erasmus' },
    // ── CROACIA (desde 2023) ──────────────────────────────────────────
  { id: 'hr_2023_er', country: 'Croacia', year: 2023, description: 'Programa Erasmus', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/hr_2023_er.jpg', mintage: 1000000, commemorates: '35 años Erasmus' },
  { id: 'hr_2023_in', country: 'Croacia', year: 2023, description: 'Introducción del euro en Croacia', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/hr_2023_in.jpg', mintage: 1000000, commemorates: 'Entrada en la eurozona' },
  { id: 'hr_2024',    country: 'Croacia', year: 2024, description: 'Nikola Tesla', imageUrl: wikiUrl('2_euro_Croatia_2024.png'), mintage: 1000000, commemorates: 'Nikola Tesla' },

  // ── ALEMANIA — serie Bundesländer completa ────────────────────────
  { id: 'de_2024_th', country: 'Alemania', year: 2024, description: 'Mecklemburgo - Castillo de Schwerin', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2024_th.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer' },

  // ── AUSTRIA ───────────────────────────────────────────────────────
  { id: 'at_2023', country: 'Austria', year: 2023, description: '150 años Banco Nacional de Austria', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2023.jpg', mintage: 7000000, commemorates: '150 años OeNB' },
  { id: 'at_2024', country: 'Austria', year: 2024, description: '175 años Constitución austríaca', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/at_2024.jpg', mintage: 7000000, commemorates: 'Constitución Austria' },

  // ── BÉLGICA ───────────────────────────────────────────────────────
  { id: 'be_2023', country: 'Bélgica', year: 2023, description: '75 años Declaración Universal DDHH', imageUrl: wikiUrl('2_euro_Belgium_2023.png'), mintage: 5000000, commemorates: '75 años DDHH' },
  { id: 'be_2024', country: 'Bélgica', year: 2024, description: 'Presidencia belga UE 2024', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2024.jpg', mintage: 5000000, commemorates: 'Presidencia UE' },

  // ── CHIPRE ────────────────────────────────────────────────────────
  { id: 'cy_2023', country: 'Chipre', year: 2023, description: '60 años República de Chipre', imageUrl: wikiUrl('2_euro_Cyprus_2023.png'), mintage: 500000, commemorates: '60 años República' },
  { id: 'cy_2024', country: 'Chipre', year: 2024, description: 'Acrópolis de Chipre', imageUrl: wikiUrl('2_euro_Cyprus_2024.png'), mintage: 500000, commemorates: 'Acrópolis' },

  // ── ESLOVAQUIA ────────────────────────────────────────────────────
  { id: 'sk_2023', country: 'Eslovaquia', year: 2023, description: '150 años Academia Eslovaca de Ciencias', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2023.png', mintage: 1000000, commemorates: 'Academia de Ciencias' },
  { id: 'sk_2024', country: 'Eslovaquia', year: 2024, description: '200 años nacimiento de Ľudovít Štúr', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2024.jpg', mintage: 1000000, commemorates: 'Ľudovít Štúr' },

  // ── ESLOVENIA ─────────────────────────────────────────────────────
  { id: 'si_2023', country: 'Eslovenia', year: 2023, description: '100 años nacimiento de José Plečnik', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/si_2023.jpg', mintage: 1000000, commemorates: 'José Plečnik' },
  { id: 'si_2024', country: 'Eslovenia', year: 2024, description: 'Parque Nacional del Triglav', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/si_2024.jpg', mintage: 1000000, commemorates: 'Parque Nacional Triglav' },

  // ── ESPAÑA ────────────────────────────────────────────────────────
  { id: 'es_2024a', country: 'España', year: 2024, description: 'Parque Nacional de Doñana', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2024a.jpg', mintage: 6000000, commemorates: 'UNESCO - Doñana' },
  { id: 'es_2024b', country: 'España', year: 2024, description: 'Obras de Gaudí', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2024b.jpg', mintage: 6000000, commemorates: 'UNESCO - Gaudí' },

  // ── ESTONIA ───────────────────────────────────────────────────────
  { id: 'ee_2023', country: 'Estonia', year: 2023, description: '150 años Sociedad Coral Estonia', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ee_2023.jpg', mintage: 1000000, commemorates: 'Sociedad Coral' },
  { id: 'ee_2024', country: 'Estonia', year: 2024, description: '100 años de la Universidad de Tartu', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ee_2024.jpg', mintage: 1000000, commemorates: 'Universidad de Tartu' },

  // ── FINLANDIA ─────────────────────────────────────────────────────
  { id: 'fi_2023', country: 'Finlandia', year: 2023, description: 'Turku - 800 años', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fi_2023.png', mintage: 1500000, commemorates: '800 años Turku' },
  { id: 'fi_2024', country: 'Finlandia', year: 2024, description: '100 años Parlamento femenino', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fi_2024.jpg', mintage: 1500000, commemorates: 'Parlamento femenino' },

  // ── FRANCIA ───────────────────────────────────────────────────────
  { id: 'fr_2024a', country: 'Francia', year: 2024, description: 'Juegos Paralímpicos París 2024', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2024a.png', mintage: 10000000, commemorates: 'Paralímpicos 2024' },
  { id: 'fr_2024b', country: 'Francia', year: 2024, description: '80 años Liberación de Francia', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/fr_2024b.png', mintage: 10000000, commemorates: '80 años Liberación' },

  // ── GRECIA ────────────────────────────────────────────────────────
  { id: 'gr_2023', country: 'Grecia', year: 2023, description: '2500 años Batalla de las Termópilas', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/gr_2023.png', mintage: 2000000, commemorates: 'Batalla Termópilas' },
  { id: 'gr_2024', country: 'Grecia', year: 2024, description: '100 años República Helénica', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/gr_2024.jpg', mintage: 2000000, commemorates: 'República Helénica' },

  // ── IRLANDA ───────────────────────────────────────────────────────
  { id: 'ie_2023', country: 'Irlanda', year: 2023, description: '100 años del Estado Libre Irlandés', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ie_2023.jpg', mintage: 5000000, commemorates: 'Estado Libre Irlandés' },
  { id: 'ie_2024', country: 'Irlanda', year: 2024, description: '100 años Consejo de Estado', imageUrl: wikiUrl('2_euro_Ireland_2024.png'), mintage: 5000000, commemorates: 'Consejo de Estado' },

  // ── ITALIA ────────────────────────────────────────────────────────
  { id: 'it_2023a', country: 'Italia', year: 2023, description: '500 años muerte de Perugino', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2023a.jpg', mintage: 5000000, commemorates: 'Perugino' },
  { id: 'it_2023b', country: 'Italia', year: 2023, description: '75 años Constitución italiana', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2023b.jpg', mintage: 5000000, commemorates: '75 años Constitución' },
  { id: 'it_2024a', country: 'Italia', year: 2024, description: 'Via Appia Antica - UNESCO', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2024a.jpg', mintage: 5000000, commemorates: 'Via Appia' },
  { id: 'it_2024b', country: 'Italia', year: 2024, description: '100 años muerte de Giacomo Puccini', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2024b.jpg', mintage: 5000000, commemorates: 'Giacomo Puccini' },

  // ── LETONIA ───────────────────────────────────────────────────────
  { id: 'lv_2023', country: 'Letonia', year: 2023, description: '150 años de Jānis Rainis', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/lv_2023.jpg', mintage: 1000000, commemorates: 'Jānis Rainis' },
  { id: 'lv_2024', country: 'Letonia', year: 2024, description: 'Municipio de Zemgale', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/lv_2024.png', mintage: 1000000, commemorates: 'Zemgale' },

  // ── LITUANIA ──────────────────────────────────────────────────────
  { id: 'lt_2023', country: 'Lituania', year: 2023, description: 'Dzūkija - Parque Nacional', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/lt_2023.png', mintage: 1000000, commemorates: 'Parque Dzūkija' },
  { id: 'lt_2024', country: 'Lituania', year: 2024, description: 'Žemaitija - Parque Nacional', imageUrl: wikiUrl('2_euro_Lithuania_2024.png'), mintage: 1000000, commemorates: 'Parque Žemaitija' },

  // ── LUXEMBURGO ────────────────────────────────────────────────────
  { id: 'lu_2023', country: 'Luxemburgo', year: 2023, description: '175 años Constitución luxemburguesa', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/lu_2023.png', mintage: 700000, commemorates: 'Constitución' },
  { id: 'lu_2024', country: 'Luxemburgo', year: 2024, description: 'Maternidad - Charlotte de Luxemburgo', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/lu_2024.jpg', mintage: 700000, commemorates: 'Charlotte de Luxemburgo' },

  // ── MALTA ─────────────────────────────────────────────────────────
  { id: 'mt_2023', country: 'Malta', year: 2023, description: 'Templo de Mnajdra', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/mt_2023.jpg', mintage: 1500000, commemorates: 'Templo Mnajdra' },
  { id: 'mt_2024', country: 'Malta', year: 2024, description: 'Ciudadela de Gozo', imageUrl: wikiUrl('2_euro_Malta_2024.png'), mintage: 1500000, commemorates: 'Ciudadela Gozo' },

  // ── PAÍSES BAJOS ──────────────────────────────────────────────────
  { id: 'nl_2023', country: 'Países Bajos', year: 2023, description: '50 años muerte de Willem de Kooning', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/nl_2023.jpg', mintage: 5000000, commemorates: 'Willem de Kooning' },
  { id: 'nl_2024', country: 'Países Bajos', year: 2024, description: 'Fundación del Reino de los Países Bajos', imageUrl: wikiUrl('2_euro_Netherlands_2024.png'), mintage: 5000000, commemorates: 'Reino Países Bajos' },

  // ── PORTUGAL ──────────────────────────────────────────────────────
  { id: 'pt_2023', country: 'Portugal', year: 2023, description: '50 años Revolución de los Claveles', imageUrl: wikiUrl('2_euro_Portugal_2023.png'), mintage: 6000000, commemorates: 'Revolución Claveles' },
  { id: 'pt_2024a', country: 'Portugal', year: 2024, description: '50 años Revolución del 25 de Abril', imageUrl: wikiUrl('2_euro_Portugal_2024.png'), mintage: 6000000, commemorates: '25 de Abril' },
  { id: 'pt_2024b', country: 'Portugal', year: 2024, description: '500 años muerte de Vasco da Gama', imageUrl: wikiUrl('2_euro_Portugal_2024b.png'), mintage: 6000000, commemorates: 'Vasco da Gama' },

  // ── SAN MARINO ────────────────────────────────────────────────────
  { id: 'sm_2023', country: 'San Marino', year: 2023, description: '500 años muerte del Perugino', imageUrl: wikiUrl('2_euro_San_Marino_2023.png'), mintage: 62000, commemorates: 'Perugino' },
  { id: 'sm_2024', country: 'San Marino', year: 2024, description: 'Giovanni Battista Tiepolo', imageUrl: wikiUrl('2_euro_San_Marino_2024.png'), mintage: 62000, commemorates: 'Tiepolo' },

  // ── VATICANO ──────────────────────────────────────────────────────
  { id: 'va_2023', country: 'Vaticano', year: 2023, description: 'JMJ Lisboa 2023', imageUrl: wikiUrl('2_euro_Vatican_2023.png'), mintage: 85000, commemorates: 'JMJ Lisboa' },
  { id: 'va_2024', country: 'Vaticano', year: 2024, description: 'Año de la Oración', imageUrl: wikiUrl('2_euro_Vatican_2024.png'), mintage: 85000, commemorates: 'Año Oración' },

  // ── MÓNACO ────────────────────────────────────────────────────────
  { id: 'mc_2023', country: 'Mónaco', year: 2023, description: '100 años nacimiento de Rainiero III', imageUrl: wikiUrl('2_euro_Monaco_2023.png'), mintage: 15000, commemorates: 'Rainiero III' },
  { id: 'mc_2024', country: 'Mónaco', year: 2024, description: 'Aniversario Casa Grimaldi', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/mc_2024.jpg', mintage: 15000, commemorates: 'Casa Grimaldi' },

  // ── ANDORRA ───────────────────────────────────────────────────────
  { id: 'ad_2014', country: 'Andorra', year: 2014, description: 'Mayoría de edad a los 18 años', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/ad_2014.jpg', mintage: 70000, commemorates: 'Mayoría de edad' },
  { id: 'ad_2015', country: 'Andorra', year: 2015, description: '30 años Bandera UE', imageUrl: wikiUrl('2_euro_Andorra_2015.png'), mintage: 70000, commemorates: 'Bandera UE' },
  { id: 'ad_2016', country: 'Andorra', year: 2016, description: 'Casa de la Vall', imageUrl: wikiUrl('2_euro_Andorra_2016.png'), mintage: 70000, commemorates: 'Casa de la Vall' },
  { id: 'ad_2017', country: 'Andorra', year: 2017, description: 'La Margineda', imageUrl: wikiUrl('2_euro_Andorra_2017.png'), mintage: 70000, commemorates: 'Puente La Margineda' },
  { id: 'ad_2018', country: 'Andorra', year: 2018, description: 'Patrimonio natural andorrano', imageUrl: wikiUrl('2_euro_Andorra_2018.png'), mintage: 70000, commemorates: 'Naturaleza Andorra' },
  { id: 'ad_2019', country: 'Andorra', year: 2019, description: '600 años Consell de la Terra', imageUrl: wikiUrl('2_euro_Andorra_2019.png'), mintage: 70000, commemorates: 'Consell de la Terra' },
  { id: 'ad_2020', country: 'Andorra', year: 2020, description: 'Reforma de la Constitución', imageUrl: wikiUrl('2_euro_Andorra_2020.png'), mintage: 70000, commemorates: 'Constitución Andorra' },
  { id: 'ad_2021', country: 'Andorra', year: 2021, description: '30 años Constitución andorrana', imageUrl: wikiUrl('2_euro_Andorra_2021.png'), mintage: 70000, commemorates: '30 años Constitución' },
  { id: 'ad_2022', country: 'Andorra', year: 2022, description: 'Programa Erasmus', imageUrl: wikiUrl('2_euro_Andorra_2022.png'), mintage: 70000, commemorates: '35 años Erasmus' },
  { id: 'ad_2023', country: 'Andorra', year: 2023, description: '30 años relaciones con la UE', imageUrl: wikiUrl('2_euro_Andorra_2023.png'), mintage: 70000, commemorates: '30 años UE-Andorra' },
  { id: 'ad_2024', country: 'Andorra', year: 2024, description: 'Escudo de Andorra', imageUrl: wikiUrl('2_euro_Andorra_2024.png'), mintage: 70000, commemorates: 'Escudo Nacional' },
  // ── EMISIONES 2025 (Programadas/Emitidas) ──────────────────────────
  { id: 'de_2025_sl', country: 'Alemania', year: 2025, description: 'Sarre - Saarschleife (Meandro del Sarre)', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/de_2025_sl.jpg', mintage: 30000000, commemorates: 'Serie Bundesländer II' },
  { id: 'es_2025_sa', country: 'España', year: 2025, description: 'Ciudad vieja de Salamanca', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/es_2025_sa.jpg', mintage: 2000000, commemorates: 'UNESCO - Salamanca' },
  { id: 'be_2025_lot', country: 'Bélgica', year: 2025, description: 'Lotería Nacional de Bélgica', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/be_2025_lot.jpg', mintage: 1000000, commemorates: 'Lotería Nacional' },
  { id: 'it_2025_jub', country: 'Italia', year: 2025, description: 'Año Jubilar 2025', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/it_2025_jub.jpg', mintage: 3000000, commemorates: 'Jubileo 2025' },
  { id: 'sk_2025_ih',  country: 'Eslovaquia', year: 2025, description: '100 años del Campeonato Europeo de Hockey sobre Hielo', imageUrl: 'https://idoiwlaxghwdbamkhftu.supabase.co/storage/v1/object/public/coins/sk_2025_ih.jpg', mintage: 1000000, commemorates: 'Deporte eslovaco' },
  { id: 'ee_2025_txt', country: 'Estonia', year: 2025, description: '500 años del primer texto impreso en estonio', imageUrl: wikiUrl('2_euro_Estonia_2025_Text.png'), mintage: 850000, commemorates: 'Cultura Estonia' },
  { id: 'lt_2025_def', country: 'Lituania', year: 2025, description: 'Defensa del Estado Lituano', imageUrl: wikiUrl('2_euro_Lithuania_2025_Defense.png'), mintage: 500000, commemorates: 'Defensa Nacional' },
  { id: 'fr_2025_lou', country: 'Francia', year: 2025, description: 'Museo del Louvre - La Gioconda', imageUrl: wikiUrl('2_euro_France_2025_Louvre.png'), mintage: 315000, commemorates: 'Louvre' },
]

export const COUNTRIES = [...new Set(ALL_COINS.map(c => c.country))].sort()
export const YEARS = [...new Set(ALL_COINS.map(c => c.year))].sort()