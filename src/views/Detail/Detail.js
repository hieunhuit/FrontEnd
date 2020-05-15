import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import ipInt from 'ip-to-int';
import moment from 'moment';
import allActions from '../../actions';
Detail.propTypes = {};

const useStyles = makeStyles({
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  table: {
    minWidth: '250px',
    border: '1px solid',
  },
  row: {
    border: '1px solid',
  },
  cell: {
    border: '1px solid',
    padding: '10px',
  },
  cardHeader: { backgroundColor: '#1d3557' },
});

function Detail(props) {
  const eventDetail = useSelector((state) => state.events.eventDetail);
  const { sid, cid } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.eventActions.getDetailEvent({ sid, cid }));
  }, []);
  const renderDetail = () => {
    let xhtml = null;
    if (eventDetail) {
      xhtml = (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader className={classes.cardHeader}>
                <h4 className={classes.cardTitleWhite}>Meta</h4>
              </CardHeader>
              <CardBody>
                <Table width="90%">
                  <TableBody>
                    <TableRow className={classes.row}>
                      <TableCell className={classes.cell}>
                        <Table className={classes.table} cellpadding="4">
                          <TableHead>
                            <TableRow className={classes.row}>
                              <TableCell className={classes.cell} size="small">
                                ID
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                Time
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                Triggered Signature
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow className={classes.row}>
                              <TableCell className={classes.cell}>{`${eventDetail.sid}-${eventDetail.cid}`}</TableCell>
                              <TableCell className={classes.cell}>
                                {moment.parseZone(eventDetail.time).format('YYYY-MM-DD HH:mm:ss')}
                              </TableCell>
                              <TableCell className={classes.cell}>
                                <font size="-1">
                                  [
                                  <a href="http://www.snort.org/search/sid/1-10000006" target="_ACID_ALERT_DESC">
                                    snort
                                  </a>
                                  ]
                                </font>
                                {eventDetail.Signature.sig_name}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <TableCell className={classes.cell}>
                        <Table className={classes.table} cellpadding="4">
                          <TableBody>
                            <TableRow className={classes.row}>
                              <TableCell
                                style={{ fontWeight: '500' }}
                                className={classes.cell}
                                align="center"
                                rowSpan="2"
                              >
                                Sensor
                              </TableCell>
                              <TableCell style={{ fontWeight: '500' }} className={classes.cell}>
                                Sensor Address
                              </TableCell>
                              <TableCell style={{ fontWeight: '500' }} className={classes.cell}>
                                Interface
                              </TableCell>
                            </TableRow>
                            <TableRow className={classes.row}>
                              <TableCell className={classes.cell}>{eventDetail.Sensor.hostname}</TableCell>
                              <TableCell className={classes.cell}>{eventDetail.Sensor.interface}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>IP</h4>
              </CardHeader>
              <CardBody>
                <Table width="90%">
                  <TableBody>
                    <TableRow className={classes.row}>
                      <TableCell className={classes.cell}>
                        <Table className={classes.table} cellPadding="4">
                          <TableHead>
                            <TableRow className={classes.row}>
                              <TableCell className={classes.cell} size="small">
                                Source IP
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                Destination IP
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                Ver
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                Hdr Len
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                TOS
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                length
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                ID
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                Fragment
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                Offset
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                TTL
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                chksum
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow className={classes.row}>
                              <TableCell className={classes.cell} size="small">
                                {eventDetail.Iphdr.ip_src != 0 ? ipInt(eventDetail.Iphdr.ip_src).toIP() : '0.0.0.0'}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {ipInt(eventDetail.Iphdr.ip_dst).toIP()}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_ver}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_hlen}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_tos}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_len}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_id}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_flags}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_off}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_ttl}
                              </TableCell>
                              <TableCell className={classes.cell} align="center">
                                {eventDetail.Iphdr.ip_csum}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
          {eventDetail.Icmphdr && (
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>ICMP</h4>
                </CardHeader>
                <CardBody>
                  <Table width="90%">
                    <TableBody>
                      <TableRow className={classes.row}>
                        <TableCell className={classes.cell}>
                          <Table className={classes.table} cellpadding="4">
                            <TableHead>
                              <TableRow className={classes.row}>
                                <TableCell className={classes.cell} size="small">
                                  Type
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Code
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Checksum
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  ID
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Seq
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow className={classes.row}>
                                <TableCell className={classes.cell} size="small">
                                  {eventDetail.Icmphdr.icmp_type}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Icmphdr.icmp_code}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Icmphdr.icmp_csum}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Icmphdr.icmp_id}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Icmphdr.icmp_seq}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </GridItem>
          )}
          {eventDetail.Udphdr && (
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>UDP</h4>
                </CardHeader>
                <CardBody>
                  <Table width="90%">
                    <TableBody>
                      <TableRow className={classes.row}>
                        <TableCell className={classes.cell}>
                          <Table className={classes.table} cellpadding="4">
                            <TableHead>
                              <TableRow className={classes.row}>
                                <TableCell className={classes.cell} size="small">
                                  Source port
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Destination port
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Checksum
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Lenght
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow className={classes.row}>
                                <TableCell className={classes.cell} size="small">
                                  {eventDetail.Udphdr.udp_sport}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Udphdr.udp_dport}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Udphdr.udp_csum}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Udphdr.udp_len}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </GridItem>
          )}
          {eventDetail.Tcphdr && (
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>TCP</h4>
                </CardHeader>
                <CardBody>
                  <Table width="90%">
                    <TableBody>
                      <TableRow className={classes.row}>
                        <TableCell className={classes.cell}>
                          <Table className={classes.table} cellpadding="4">
                            <TableHead>
                              <TableRow className={classes.row}>
                                <TableCell className={classes.cell} size="small">
                                  Source port
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Destination port
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Seq
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Ack
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Seq
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Off
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Res
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Flags
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Checksum
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  Urp
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow className={classes.row}>
                                <TableCell className={classes.cell} size="small">
                                  {eventDetail.Tcphdr.tcp_sport}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_dport}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_seq}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_ack}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_seq}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_off}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_res}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_flags}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_csum}
                                </TableCell>
                                <TableCell className={classes.cell} align="center">
                                  {eventDetail.Tcphdr.tcp_urp}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </GridItem>
          )}
        </GridContainer>
      );
    }
    return xhtml;
  };
  return <div>{renderDetail()}</div>;
}

export default Detail;
