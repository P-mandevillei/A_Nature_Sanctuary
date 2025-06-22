import TimeStamp from "../../TimeStamp";
import autopsy from "./pics/autopsy_enantiopus_kilesa.jpeg";
import fishInSand from "./pics/enantiopus_kilesa_in_sand.jpeg";
import emptyTank from "./pics/empty_tank.jpeg";
import MathBlock from "../../MathBlock";
import ArticlePic from "../ArticlePic";
import Shanghai from "./pics/shanghai_pipe_water.png";
import StLouis from "./pics/st_louis_tap.png";
import { useContext, useRef } from "react";
import WidthContext from "../../../contexts/widthContext";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";

export default function Chloramine() {

    const screenW = useContext(WidthContext);
    const sectionRef = useRef();
    const {lang} = useParams();
    const {t} = useTranslation('chloramine');

    return <div className="pad" style={{width: '100%'}}>
        <h1 className="center primaryColor"> {t('title')} </h1>
        <TimeStamp name="chloramine" style={{'textAlign': 'center'}} />
        <br/>
        <p>
            {t('p1')}
            {' '} <i>{t('p2')}</i> 
            {' '} {t('p3')}
        </p>
        <ArticlePic src={fishInSand} alt="A poor E. kilesa sticking their head into the substrate">
            {t('p4')}
        </ArticlePic>
        <p>
            {t('p5')}
            <span className="primaryColor bold">{t('p6')}</span>
        </p>
        <p>
            {t('p7')}
            <span className="primaryColor bold">{t('p8')}</span> 
            {t('p9')}
        </p>
        <ArticlePic src={emptyTank} alt="A picture of my tank" />

        <h2 className="primaryColor">{t('p10')}</h2>
        <p>
            {t('p11')}
            {' '} <a href="https://pubchem.ncbi.nlm.nih.gov/compound/Hypochlorous-Acid" target="_blank">{t('p12')}</a>
            {t('p13')}
        </p>
        <MathBlock 
            content={"2\\text{HClO} \\leftrightarrow 2\\text{H}^+ + 2\\text{Cl}^- + \\text{O}_2"} 
            className="primaryColor"
        />
        <p className="picExplain center">{t("p14")}</p>
        <p>
            {t('p15')}
            <span className="primaryColor bold">{t('p16')}</span>
            {t('p17')}
        </p>
        <MathBlock
            content={"\\text{Cl}_2 + \\text{H}_2\\text{O} \\leftrightarrow \\text{H}^+ + \\text{Cl}^- + \\text{HClO}"}
            className="primaryColor"
        />
        <p className="picExplain center">{t('p18')}</p>
        <MathBlock
            content={"\\text{HClO} \\leftrightarrow \\text{H}^+ + \\text{ClO}^-"}
            className="primaryColor"
        />
        <p className="picExplain center">{t('p19')}</p>
        <p>
            {t('p20')} {' '}
            <MathBlock inline content="\text{HClO}"/> {' '}
            {t('p21')} {' '}
            <MathBlock inline content="\text{ClO}^-" /> {' '}
            {t('p22')} {' '}
            <span className="primaryColor bold">
                {t('p23')}
            </span>
            {t('p24')} {' '}
            <a href="https://pubchem.ncbi.nlm.nih.gov/compound/25423" target="_blank">{t('p25')}</a>
            {t('p25-26')}
            <span className="primaryColor bold">{t('p26')}</span>
            {t('p27')}
        </p>
        <MathBlock
            content={`\\text{HClO} + \\text{NH}_3 \\leftrightarrow \\text{NH}_2\\text{Cl (${t('chloramine')})} + \\text{H}_2\\text{O}`}
            className="primaryColor"
        />
        <p className="picExplain center">
            {t('p28')}
        </p>
        <p>
            {t('p29')}
            <span className="primaryColor bold">{t('p30')}</span>
            {t('p31')}
            1.5 <MathBlock inline content="\pm" /> 1
            {t('period')}
            <sup className="selectable primaryColor primaryColorHover" onClick={()=>{sectionRef.current.scrollIntoView({behavior: 'smooth'})}}>1</sup>
            {t('p32')} {' '}
            <MathBlock inline content="\text{Fe}^{2+}" /> 
            {' '} {t('p33')} {' '}
            <MathBlock inline content="\text{Fe}^{3+}" />
            {t('period')}
            <sup className="selectable primaryColor primaryColorHover" onClick={()=>{sectionRef.current.scrollIntoView({behavior: 'smooth'})}}>2</sup>
            {t('p34')}
        </p>
        <ArticlePic src={autopsy} alt={'Dead E. kilesa'} >
            {t('p35')}
        </ArticlePic>
        <p>
            {t('p36')}
        </p>
        <p>
            {t('p37')}
            <span className="primaryColor bold">{t('p38')}</span>
            {t('p39')}
        </p>
        <p>
            {t('p40')}
            <span className="primaryColor bold">{t('p41')}</span>
            {t('p42')}
        </p>
        <ArticlePic src={Shanghai} >
            {t('p43')}
            <sup className="selectable primaryColor primaryColorHover" onClick={()=>{sectionRef.current.scrollIntoView({behavior: 'smooth'})}}>3</sup>
        </ArticlePic>
        <ArticlePic src={StLouis} >
            {t('p44')}
            <sup className="selectable primaryColor primaryColorHover" onClick={()=>{sectionRef.current.scrollIntoView({behavior: 'smooth'})}}>4</sup>
        </ArticlePic>
        <p>
            {t('p45')}
            <span className="primaryColor bold"> 0.49 mg/L </span>
            {t('p46')}
        </p>
        <p>
            {t('p47')}
        </p>
        {
            screenW<500? <>
                <MathBlock 
                    className="primaryColor"
                    content="6\text{OH}^- + \text{S}_2\text{O}_3^{2-} + 4\text{NH}_2\text{Cl}"
                />
                <MathBlock
                    className="primaryColor"
                    content=" \rightarrow 2\text{SO}_4^{2-} + 4\text{Cl}^- + 4\text{NH}_3 + \text{H}_2\text{O}"
                />
            </>
            :
            <MathBlock
                className="primaryColor"
                content="6\text{OH}^- + \text{S}_2\text{O}_3^{2-} + 4\text{NH}_2\text{Cl} \rightarrow 2\text{SO}_4^{2-} + 4\text{Cl}^- + 4\text{NH}_3 + \text{H}_2\text{O}"
            />
        }
        <p className="picExplain center">
            {t('p48')}
        </p>
        <p>
            <span className="primaryColor bold">
                {t('p49')}
            </span>
            {' '} {t('p50')}
        </p>

        <h2 ref={sectionRef} className="primaryColor" style={{fontSize: '1.2em'}}>{t('ref')}</h2>
        <p className="hangingIndent ref wrap">
            (1) Trogolo, D.; Arey, J. S. Equilibria and Speciation of Chloramines, Bromamines, and Bromochloramines in Water. Environmental Science & Technology 2016, 51 (1), 128–140. https://doi.org/10.1021/acs.est.6b03219.
        </p>
        <p className="hangingIndent ref wrap">
            (2) City of Foster City Public Works / Estero Municipal Improvement District. Chloramination Questions and Answers, updated May 20, 2004; Foster City, CA. https://www.fostercity.org/sites/default/files/fileattachments/public_works/page/4761/more-chloramine-faq-s.pdf (accessed June 22, 2025).
        </p>
        <p className="hangingIndent ref wrap">
            (3) Shanghai Water Authority (Shanghai Municipal Oceanic Bureau). 上海中心城区2025年5月供水水质; 2025. https://swj.sh.gov.cn/bmts/20250618/8f0f6cc29d2649cc9652003420f94687.html (accessed 2025-06-22).
        </p>
        <p className="hangingIndent ref wrap">
            (4) City of St. Louis Water Division - Department of Public Utilities; Skouby, C. City of St. Louis Water Division Consumer Confidence Report 2022; 2022; p. 6. https://www.stlwater.com/water-quality/ccr2022.pdf (accessed 2025-06-22).
        </p>
        
        <Link to={`/${lang}/focus`}>{t('back')}</Link>
    </div>
}