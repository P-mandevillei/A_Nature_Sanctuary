import { Col, Container, Row, Form, Button } from "react-bootstrap";
import CalculatorBlock from "./CalculatorBlock";
import { useEffect, useId, useState } from "react";
import useLocalStorage from "../../../hooks/UseLocalStorage";
import { useTranslation } from "react-i18next";

export default function() {
    const [calcMode, setCalcMode] = useLocalStorage('mode', 'default');
    const [blockNum, setBlockNum] = useLocalStorage('blocks', [0]);
    const modeId = useId();
    const rocLevelId = useId();
    const rocUnitId = useId();
    const [rocLevel, setRocLevel] = useState(0);
    const [rocUnit, setRocUnit] = useState(30);
    const [rocConverted, setRocConverted] = useState(0);

    useEffect(()=>{
        if (isNaN(parseFloat(rocLevel)) || isNaN(parseFloat(rocUnit))) {
            setRocConverted(0);
            return;
        }
        setRocConverted(rocLevel/rocUnit*30);
    }, [rocLevel, rocUnit]);

    const {t} = useTranslation('waterChangeCalculator');

    return <Container>
        <Row>
            <Col sm={12} md={6} lg={4} xl={3} className="pad">
                <p className="primaryColor bold enlarge center">{t('title')} <sup>*</sup> </p>
                <p>{t('des1')} "<span className="secondaryColor bold">+</span>" {t('des2')}</p>
                <p><span className="secondaryColor bold">{t('des3')}</span> {t('des4')} <span className="secondaryColor bold">{t('des5')}</span> {t('des6')}</p>
                <p>{t('des7')} <span className="secondaryColor bold">{t('des8')}</span> {t('des9')}</p>
                <Form.Label htmlFor={modeId} className="primaryColor">{t('modeSelect')}</Form.Label>
                <Form.Select id={modeId} value={calcMode} onChange={e => setCalcMode(e.target.value)}>
                    <option value='default'>-- {t('default')} --</option>
                    <option value='removeThenAdd'>{t('mode1')}</option>
                    <option value='removeWhileAdd'>{t('mode2')}</option>
                    <option value='addThenRemove'>{t('mode3')}</option>
                </Form.Select>
                <br />
                <p className="primaryColor">{t('convert')} <span className="shrink"> ({t('convertDes')}) </span></p>
                <Container>
                    <Row>
                        <Col xs={6}>
                            <Form.Label htmlFor={rocLevelId}>{t('level')}</Form.Label>
                            <Form.Control type="number" id={rocLevelId} value={rocLevel} onChange={(e)=>{setRocLevel(e.target.value)}} />
                        </Col>
                        <Col xs={6}>
                            <Form.Label htmlFor={rocUnitId}>{t('days')} </Form.Label>
                            <Form.Control type="number" id={rocUnitId} value={rocUnit} onChange={(e)=>{setRocUnit(e.target.value)}} />
                        </Col>
                    </Row>
                </Container>     
                <p className="secondaryColor bold">
                    {rocLevel} ({t('unit1', {'number': rocUnit})}) = {rocConverted} ({t('unit2')})
                </p>
                <p className="shrink grey"> 
                    <sup>*</sup> {t('reference')} <a href='https://mp.weixin.qq.com/s/1Hr0FKTt7gGaDrpPCIKldw' target="_blank"> {t('refTitle')} </a>
                </p>

            </Col>
            <Col sm={12} md={6} lg={8} xl={9}>
                <Container>
                    <Row>
                        {blockNum.map(cur=><Col key={cur} sm={12} md={6} xl={4}>
                            <CalculatorBlock mode={calcMode} name={cur} blockNum={blockNum} setBlockNum={setBlockNum}/>
                        </Col>)}
                        <Col sm={12} md={6} xl={4} className="pad" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button 
                                className="round primaryColorBg primaryColorBgHover" 
                                style={{'aspectRatio': '1/1', 'margin': 'auto'}}
                                onClick={()=>{setBlockNum([...blockNum, blockNum[blockNum.length-1]+1])}}
                            >
                                +
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
        
        
    </Container>
}