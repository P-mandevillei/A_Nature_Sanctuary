import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useEffect, useId, useState } from "react";
import useLocalStorage from "../../../hooks/UseLocalStorage";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import TimeStamp from "../../TimeStamp";
import CalculatorBlock from "./CalculatorBlock";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function() {
    const [calcMode, setCalcMode] = useLocalStorage('mode', 'default');
    const [blockNum, setBlockNum] = useLocalStorage('levelBlocks', [0]);
    const modeId = useId();

    const {t} = useTranslation('waterChangeLevelAdjustment');
    const {lang} = useParams();
    const [showIns, setShowIns] = useState(false);

    return <div style={{position: 'relative', minHeight: '90vh'}} className="pad">
    <Container fluid style={{width: '100%', marginBottom: '2em'}}>
        <Row>
            <Col xs={12} sm={6} lg={4} xl={3} >
                <p className="primaryColor bold enlarge center noMargin">{t('title')} <sup>*</sup> </p>
                
                <p className="noMargin grey bold selectableHover hover" onClick={()=>{setShowIns(o => !o)}}>
                    <motion.span
                        animate={{ rotate: (showIns? 0:-90) }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'inline-block' }}
                    >
                        <ChevronDown size={18}/>
                    </motion.span>
                    {t('ins')}
                </p>

                <AnimatePresence>
                {showIns && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <p className="shrink primaryColor"> 
                            {t('nav1')} 
                            <Link to={`/${lang}/aquarium_calculator/water_change_calculator`}>{t('nav2')}</Link>
                        </p>
                        <p className="noMargin">{t('des1')}<span className="primaryColor bold">+</span>{t('des2')}</p>
                        <p className="noMargin"><span className="primaryColor bold">{t('des3')}</span>{t('des4')}<span className="primaryColor bold">{t('des5')}</span>{t('des6')}</p>
                        <p>{t('des7')}<span className="primaryColor bold">{t('des8')}</span>{t('des9')}</p>
                        <p className="grey shrink"> {t('unitReminder')} </p>
                    </motion.div>
                )}
                </AnimatePresence>                
                <p className="center marginTopBottom">
                    <Form.Label htmlFor={modeId} className="primaryColor">{t('modeSelect')}</Form.Label>
                    <Form.Select id={modeId} value={calcMode} onChange={e => setCalcMode(e.target.value)}>
                        <option value='default'>-- {t('default')} --</option>
                        <option value='removeThenAdd'>{t('mode1')}</option>
                        <option value='removeWhileAdd'>{t('mode2')}</option>
                        <option value='addThenRemove'>{t('mode3')}</option>
                    </Form.Select>
                </p>
                
                <p className="shrink grey"> 
                    <sup>*</sup> {t('reference')} <a href='https://mp.weixin.qq.com/s/1Hr0FKTt7gGaDrpPCIKldw' target="_blank"> {t('refTitle')} </a>
                </p>

            </Col>
            {
            //<Col xs={12} sm={6} lg={8} xl={9} style={{height: '100%', flex: 1}}>
                //<Container fluid style={{width: '100%', height: '100%'}}>
                    //<Row>
            }
                        {
                            blockNum.map(cur=><Col key={cur} xs={12} sm={6} lg={4} xl={3} style={{padding: 0}}>
                                <CalculatorBlock mode={calcMode} name={cur} blockNum={blockNum} setBlockNum={setBlockNum}/>
                            </Col>)
                        }
                        <Col xs={12} sm={6} lg={4} xl={3} className="pad" style={{height: 450, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button 
                                className="round primaryColorBg primaryColorBgHover" 
                                style={{'aspectRatio': '1/1', 'margin': 'auto'}}
                                onClick={()=>{ 
                                    if (blockNum.length>0) {
                                        setBlockNum([...blockNum, blockNum[blockNum.length-1]+1]);
                                    } else {
                                        setBlockNum([0]);
                                    }
                                }}
                            >
                                +
                            </Button>
                        {
                        //</Col>
                    //</Row>
                //</Container>
                        }
            </Col>
        </Row>
    </Container>
    
    <div style={{position: 'absolute', bottom: 0}}>
        <Link to={`/${lang}/aquarium_calculator`}>{t('back')}</Link>
        <TimeStamp name="waterChangeLevelAdjustment"/>
    </div>

    </div>
}