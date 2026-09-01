import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { ParseResult } from '@/utils/instagramParser';
import { deobfuscate } from '@/utils/crypto';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingBottom: 70,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#09090b',
  },
  reportTitle: {
    fontSize: 10,
    color: '#71717a',
    marginTop: 4,
  },
  headerRight: {
    textAlign: 'right',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#18181b',
  },
  date: {
    fontSize: 10,
    color: '#71717a',
    marginTop: 4,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#18181b',
    marginBottom: 8,
    backgroundColor: '#f4f4f5',
    padding: 6,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 6,
    padding: 10,
    marginHorizontal: 4,
  },
  cardTitle: {
    fontSize: 10,
    color: '#71717a',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#09090b',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
    paddingVertical: 4,
  },
  textColLabel: {
    fontSize: 10,
    color: '#52525b',
  },
  textColValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#09090b',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderBottomWidth: 0,
    marginTop: 8,
  },
  sectionDesc: {
    fontSize: 9,
    color: '#71717a',
    marginBottom: 10,
    lineHeight: 1.4,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f4f4f5',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 9,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  listItem: {
    fontSize: 9,
    padding: 4,
    backgroundColor: '#f4f4f5',
    borderRadius: 4,
    color: '#18181b',
    marginRight: 4,
    marginBottom: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#a1a1aa',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#e4e4e7',
    paddingTop: 10,
  }
});

interface FollowinsReportPDFProps {
  data: ParseResult;
  limit?: number; // How many items to show in lists
  language?: 'en' | 'id';
}

const chunkArray = (arr: any[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};


const getTranslations = (lang: 'en' | 'id' = 'en') => {
  const isId = lang === 'id';
  return {
    reportTitle: isId ? "Social Media Analytics Report" : "Social Media Analytics Report",
    overview: isId ? "Overview" : "Overview",
    overviewDesc: isId 
      ? "Gambaran umum metrik koneksi dan audiens Instagram Anda saat ini." 
      : "A comprehensive overview of your current Instagram audience and connections.",
    followers: isId ? "Followers" : "Followers",
    following: isId ? "Following" : "Following",
    unfollowers: isId ? "Unfollowers" : "Unfollowers",
    fans: isId ? "Fans" : "Fans",
    mutuals: isId ? "Mutuals" : "Mutuals",
    
    accountAnalysis: isId ? "Account Analysis" : "Account Analysis",
    healthRatio: isId ? "Account Health Ratio" : "Account Health Ratio",
    healthHealthy: isId 
      ? "Sehat (≥ 1.0). Jumlah followers Anda lebih banyak daripada following Anda. Ini menunjukkan performa organik yang baik." 
      : "Healthy (≥ 1.0). You have more followers than followings, indicating strong organic performance.",
    healthUnbalanced: isId 
      ? "Tidak Seimbang (< 1.0). Anda memiliki lebih banyak following dibandingkan followers. Hal ini berpotensi memengaruhi reputasi akun." 
      : "Unbalanced (< 1.0). You follow more accounts than you have followers, which can negatively impact your account's reputation.",
    
    peakMonth: isId ? "Peak Growth Month" : "Peak Growth Month",
    peakMonthDesc: (followers: number) => isId 
      ? `Ini adalah periode dengan lonjakan tertinggi, di mana akun Anda berhasil meraih +${followers} followers baru.`
      : `This is your highest growth period, where your account gained +${followers} new followers.`,
    peakMonthEmpty: isId ? "Data tidak memadai untuk menentukan peak growth month." : "Not enough data to determine the peak growth month.",
    
    mutualConn: isId ? "Mutual Connections" : "Mutual Connections",
    mutualDesc: isId ? "Distribusi interaksi berdasarkan siapa yang mem-follow lebih dulu." : "A breakdown of interactions based on who initiated the follow.",
    youFirst: isId ? "Anda mem-follow lebih dulu" : "You followed first",
    theyFirst: isId ? "Mereka mem-follow lebih dulu" : "They followed first",
    sameDay: isId ? "Di hari yang sama" : "On the same day",
    
    pendingReq: isId ? "Pending Requests" : "Pending Requests",
    pendingDesc: isId ? "Daftar akun yang belum menerima follow request dari Anda." : "Accounts that have not yet accepted your follow requests.",
    hasNotAccepted: isId ? "akun belum menerima request Anda" : "accounts haven't accepted your request",
    
    loyalFollowers: isId ? "Top 10 Oldest Followers (Loyal)" : "Top 10 Oldest Followers (Loyal)",
    loyalDesc: isId ? "Daftar followers paling loyal yang telah mengikuti Anda sejak lama." : "Your most loyal followers who have stayed with you the longest.",
    username: isId ? "Username" : "Username",
    followedSince: isId ? "Followed Since" : "Followed Since",
    noData: isId ? "Tidak ada data yang tersedia" : "No data available",
    
    growthHistory: isId ? "Growth History (Bulanan)" : "Growth History (Monthly)",
    growthDesc: isId 
      ? "Rincian historis pertumbuhan bulanan akun Anda, mencakup jumlah followers dan following baru." 
      : "Historical breakdown of your account's monthly growth, detailing the exact number of new followers and followings.",
    month: isId ? "Bulan" : "Month",
    newFollowers: isId ? "Followers Baru" : "New Followers",
    newFollowing: isId ? "Following Baru" : "New Followings",
    yearText: (y: string) => isId ? `Tahun ${y}` : `Year ${y}`,
    
    cohortTitle: isId ? "Audience Cohort (Per Tahun)" : "Audience Cohort (By Year)",
    cohortDesc: isId 
      ? "Analisis distribusi waktu audiens mulai mem-follow Anda. Metrik ini menunjukkan tahun dengan retensi followers terbaik." 
      : "An analysis of when your audience started following you. This highlights which year brought the best follower retention.",
    year: isId ? "Tahun" : "Year",
    
    unfListTitle: (limitStr: string, total: number) => isId ? `Daftar Unfollowers (${limitStr} dari ${total})` : `Unfollowers List (${limitStr} of ${total})`,
    unfListDesc: isId 
      ? "Akun yang Anda follow, namun tidak mem-follow Anda kembali. Pertimbangkan untuk mengevaluasi daftar ini." 
      : "Accounts that you follow, but do not follow you back. Consider evaluating this list.",
    all: isId ? "Semua" : "All",
    top: isId ? "Top" : "Top",
    noUnf: isId ? "Tidak ada unfollowers yang ditemukan." : "No unfollowers found.",
    
    fansListTitle: (limitStr: string, total: number) => isId ? `Daftar Fans (${limitStr} dari ${total})` : `Fans List (${limitStr} of ${total})`,
    fansListDesc: isId 
      ? "Akun yang mem-follow Anda, namun belum Anda follow-back. Ini adalah peluang bagus untuk membangun interaksi." 
      : "Accounts that follow you, but you haven't followed back. A great opportunity to build closer interactions.",
    noFans: isId ? "Tidak ada fans yang ditemukan." : "No fans found.",
    
    footer: isId ? "Laporan ini dibuat secara aman dan privat oleh Followins (100% Client-Side)" : "This report is generated securely and privately by Followins (100% Client-Side)"
  };
};

export const FollowinsReportPDF: React.FC<FollowinsReportPDFProps> = ({ data, limit = 250, language = 'en' }) => {
  const t = getTranslations(language);
  const currentDate = new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const unfollowersList = limit === -1 ? data.unfollowers : data.unfollowers.slice(0, limit);
  const fansList = limit === -1 ? data.fans : data.fans.slice(0, limit);

  const unfollowersChunks = chunkArray(unfollowersList, 4);
  const fansChunks = chunkArray(fansList, 4);

  const followersCount = data.followersCount || 0;
  const followingCount = data.followingCount || 0;
  const healthRatio = followingCount === 0 ? followersCount : (followersCount / followingCount);
  const isHealthy = healthRatio >= 1.0;
  
  let bestMonthObj = null;
  if (data.seasonalityData && data.seasonalityData.length > 0) {
    bestMonthObj = [...data.seasonalityData].sort((a, b) => b.followers - a.followers)[0];
  }

  const groupedTimeline = (data.timeline || []).reduce((acc: Record<string, any[]>, t: any) => {
    try {
      const [year, month] = t.date.split('-');
      if (!acc[year]) acc[year] = [];
      const dateObj = new Date(parseInt(year), parseInt(month) - 1);
      acc[year].push({ 
        ...t, 
        monthName: dateObj.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { month: 'long' }) 
      });
    } catch (e) {
      if (!acc['Unknown']) acc['Unknown'] = [];
      acc['Unknown'].push({ ...t, monthName: t.date });
    }
    return acc;
  }, {});

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header} fixed>
          <View style={styles.headerLeft}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Image src="/logo.png" style={{ width: 24, height: 24, marginRight: 8 }} />
              <Text style={styles.logo}>Followins</Text>
            </View>
            <Text style={styles.reportTitle}>{t.reportTitle}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.username}>@{data.ownerUsername || 'my_account'}</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>
        </View>

        {/* Main Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.overview}</Text>
          <Text style={styles.sectionDesc}>{t.overviewDesc}</Text>
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.followers}</Text>
              <Text style={styles.cardValue}>{data.followersCount || 0}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.following}</Text>
              <Text style={styles.cardValue}>{data.followingCount || 0}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.unfollowers}</Text>
              <Text style={styles.cardValue}>{data.totalUnfollowersCount || data.unfollowers.length}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.fans}</Text>
              <Text style={styles.cardValue}>{data.totalFansCount || data.fans.length}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.mutuals}</Text>
              <Text style={styles.cardValue}>{data.totalMutualsCount || data.mutuals.length}</Text>
            </View>
          </View>
        </View>

        {/* Account Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.accountAnalysis}</Text>
          <View style={styles.row}>
            <View style={{ ...styles.card, flex: 1, marginRight: 10 }}>
              <Text style={styles.cardTitle}>{t.healthRatio}</Text>
              <Text style={{ ...styles.cardValue, marginBottom: 8 }}>{healthRatio.toFixed(2)}</Text>
              <Text style={{ fontSize: 9, color: '#52525b', lineHeight: 1.4 }}>
                {isHealthy 
                  ? t.healthHealthy
                  : t.healthUnbalanced}
              </Text>
            </View>
            <View style={{ ...styles.card, flex: 1 }}>
              <Text style={styles.cardTitle}>{t.peakMonth}</Text>
              <Text style={{ ...styles.cardValue, marginBottom: 8, fontSize: bestMonthObj && bestMonthObj.month.length > 10 ? 14 : 18 }}>
                {bestMonthObj ? bestMonthObj.month : '-'}
              </Text>
              <Text style={{ fontSize: 9, color: '#52525b', lineHeight: 1.4 }}>
                {bestMonthObj 
                  ? t.peakMonthDesc(bestMonthObj.followers)
                  : t.peakMonthEmpty}
              </Text>
            </View>
          </View>
        </View>

        {/* Mutual Stats & Pending */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
               <Text style={styles.sectionTitle}>{t.mutualConn}</Text>
               <Text style={styles.sectionDesc}>{t.mutualDesc}</Text>
               <View style={styles.textRow}>
                  <Text style={styles.textColLabel}>{t.youFirst}</Text>
                  <Text style={styles.textColValue}>{data.mutualStats?.youFirst || 0}</Text>
               </View>
               <View style={styles.textRow}>
                  <Text style={styles.textColLabel}>{t.theyFirst}</Text>
                  <Text style={styles.textColValue}>{data.mutualStats?.themFirst || 0}</Text>
               </View>
               <View style={styles.textRow}>
                  <Text style={styles.textColLabel}>{t.sameDay}</Text>
                  <Text style={styles.textColValue}>{data.mutualStats?.sameDay || 0}</Text>
               </View>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
               <Text style={styles.sectionTitle}>{t.pendingReq}</Text>
               <Text style={styles.sectionDesc}>{t.pendingDesc}</Text>
               <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#09090b', marginTop: 10, textAlign: 'center' }}>
                 {data.pendingRequests?.length || 0}
               </Text>
               <Text style={{ fontSize: 10, color: '#71717a', textAlign: 'center', marginTop: 4 }}>
                  Accounts hasn&apos;t accepted your request
                </Text>
            </View>
          </View>
        </View>

        {/* Loyal Followers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.loyalFollowers}</Text>
          <Text style={styles.sectionDesc}>{t.loyalDesc}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>{t.username}</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>{t.followedSince}</Text></View>
            </View>
            {(data.oldestFollowers || []).slice(0, 10).map((f, i) => (
              <View style={styles.tableRow} key={i}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>@{deobfuscate(f.username)}</Text></View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {new Date(f.timestamp * 1000).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' })}
                  </Text>
                </View>
              </View>
            ))}
            {(!data.oldestFollowers || data.oldestFollowers.length === 0) && (
              <View style={styles.tableRow}>
                 <View style={{...styles.tableCol, width: '100%'}}><Text style={styles.tableCell}>{t.noData}</Text></View>
              </View>
            )}
          </View>
        </View>

        {/* Growth Data (Timeline) */}
        {data.timeline && data.timeline.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.growthHistory}</Text>
            <Text style={styles.sectionDesc}>{t.growthDesc}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={{...styles.tableColHeader, width: '34%'}}><Text style={styles.tableCellHeader}>{t.month}</Text></View>
                <View style={{...styles.tableColHeader, width: '33%'}}><Text style={styles.tableCellHeader}>{t.newFollowers}</Text></View>
                <View style={{...styles.tableColHeader, width: '33%'}}><Text style={styles.tableCellHeader}>{t.newFollowing}</Text></View>
              </View>
              {Object.keys(groupedTimeline).sort((a,b) => b.localeCompare(a)).map(year => (
                <React.Fragment key={year}>
                  <View style={{...styles.tableRow, backgroundColor: '#fafafa'}}>
                    <View style={{...styles.tableCol, width: '100%', borderRightWidth: 0, padding: 6}}>
                      <Text style={{...styles.tableCell, fontFamily: 'Helvetica-Bold', color: '#18181b', textAlign: 'left'}}>
                        Tahun {year}
                      </Text>
                    </View>
                  </View>
                  {groupedTimeline[year].map((t, i) => (
                    <View style={styles.tableRow} key={`${year}-${i}`}>
                      <View style={{...styles.tableCol, width: '34%'}}>
                        <Text style={styles.tableCell}>{t.monthName}</Text>
                      </View>
                      <View style={{...styles.tableCol, width: '33%'}}><Text style={styles.tableCell}>+{t.followers}</Text></View>
                      <View style={{...styles.tableCol, width: '33%'}}><Text style={styles.tableCell}>+{t.following}</Text></View>
                    </View>
                  ))}
                </React.Fragment>
              ))}
            </View>
          </View>
        )}

        {/* Cohort Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.cohortTitle}</Text>
          <Text style={styles.sectionDesc}>{t.cohortDesc}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{...styles.tableColHeader, width: '25%'}}><Text style={styles.tableCellHeader}>{t.year}</Text></View>
              <View style={{...styles.tableColHeader, width: '25%'}}><Text style={styles.tableCellHeader}>{t.mutuals}</Text></View>
              <View style={{...styles.tableColHeader, width: '25%'}}><Text style={styles.tableCellHeader}>{t.fans}</Text></View>
              <View style={{...styles.tableColHeader, width: '25%'}}><Text style={styles.tableCellHeader}>{t.unfollowers}</Text></View>
            </View>
            {(data.cohortData || []).map((c, i) => (
              <View style={styles.tableRow} key={i}>
                <View style={{...styles.tableCol, width: '25%'}}><Text style={styles.tableCell}>{c.year}</Text></View>
                <View style={{...styles.tableCol, width: '25%'}}><Text style={styles.tableCell}>{c.mutuals}</Text></View>
                <View style={{...styles.tableCol, width: '25%'}}><Text style={styles.tableCell}>{c.fans}</Text></View>
                <View style={{...styles.tableCol, width: '25%'}}><Text style={styles.tableCell}>{c.unfollowers}</Text></View>
              </View>
            ))}
          </View>
        </View>

        {/* Unfollowers List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t.unfListTitle(limit === -1 ? t.all : `${t.top} ${Math.min(limit, unfollowersList.length)}`, data.totalUnfollowersCount || data.unfollowers.length)}
          </Text>
          <Text style={styles.sectionDesc}>{t.unfListDesc}</Text>
          <View style={styles.table}>
            {unfollowersChunks.length > 0 ? unfollowersChunks.map((chunk, rowIndex) => (
              <View style={styles.tableRow} key={rowIndex}>
                {chunk.map((u: string, colIndex: number) => (
                  <View style={{...styles.tableCol, width: '25%'}} key={colIndex}>
                    <Text style={styles.tableCell}>@{deobfuscate(u)}</Text>
                  </View>
                ))}
                {Array.from({ length: 4 - chunk.length }).map((_, i) => (
                  <View style={{...styles.tableCol, width: '25%', borderColor: 'transparent'}} key={`empty-${i}`} />
                ))}
              </View>
            )) : (
              <View style={styles.tableRow}>
                 <View style={{...styles.tableCol, width: '100%'}}><Text style={styles.tableCell}>{t.noUnf}</Text></View>
              </View>
            )}
          </View>
        </View>

        {/* Fans List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t.fansListTitle(limit === -1 ? t.all : `${t.top} ${Math.min(limit, fansList.length)}`, data.totalFansCount || data.fans.length)}
          </Text>
          <Text style={styles.sectionDesc}>{t.fansListDesc}</Text>
          <View style={styles.table}>
            {fansChunks.length > 0 ? fansChunks.map((chunk, rowIndex) => (
              <View style={styles.tableRow} key={rowIndex}>
                {chunk.map((u: string, colIndex: number) => (
                  <View style={{...styles.tableCol, width: '25%'}} key={colIndex}>
                    <Text style={styles.tableCell}>@{deobfuscate(u)}</Text>
                  </View>
                ))}
                {Array.from({ length: 4 - chunk.length }).map((_, i) => (
                  <View style={{...styles.tableCol, width: '25%', borderColor: 'transparent'}} key={`empty-${i}`} />
                ))}
              </View>
            )) : (
              <View style={styles.tableRow}>
                 <View style={{...styles.tableCol, width: '100%'}}><Text style={styles.tableCell}>{t.noFans}</Text></View>
              </View>
            )}
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer} fixed>
          Generated securely and privately by Followins (100% Client-Side)
        </Text>
      </Page>
    </Document>
  );
};
