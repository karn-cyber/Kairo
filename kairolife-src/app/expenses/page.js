'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';

export default function Expenses() {
  return (
    <>
      <Nav variant="light" />
      
      {/* HEADER */}
      <section style={{
        background: 'linear-gradient(135deg,#F2EDE3 0%,#FAF7F2 100%)',
        padding: '40px 60px',
        borderBottom: '1px solid rgba(26,22,18,0.07)'
      }}>
        <div className="container">
          <h1 style={{fontFamily: 'var(--PD)', fontSize: '48px', fontWeight: 900, color: 'var(--ink)', marginBottom: '20px'}}>
            Trip Expenses
          </h1>
          <p style={{fontSize: '14px', color: 'var(--ink3)'}}>
            Kedarkantha Trek · Day 2 of 6
          </p>
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="section cream">
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px'}}>
            {[
              {label: 'Total Spent', value: '₹4,280', desc: 'Across 8 people'},
              {label: 'Your Share', value: '₹535', desc: 'Of total'},
              {label: 'You Paid', value: '₹1,200', desc: 'So far'},
              {label: 'You Get Back', value: '₹665', desc: 'After settlement'}
            ].map((card, i) => (
              <Card key={i} style={{padding: '16px', textAlign: 'center'}}>
                <div style={{fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px', fontWeight: 600}}>
                  {card.label}
                </div>
                <div style={{fontFamily: 'var(--PD)', fontSize: '28px', fontWeight: 700, color: i === 3 ? 'var(--sage)' : 'var(--orange)', lineHeight: 1, marginBottom: '4px'}}>
                  {card.value}
                </div>
                <div style={{fontSize: '11px', color: 'var(--muted)'}}>
                  {card.desc}
                </div>
              </Card>
            ))}
          </div>

          {/* Settlement Status */}
          <Card style={{padding: '20px', marginBottom: '40px', background: 'linear-gradient(135deg,rgba(61,107,53,0.08),rgba(82,122,73,0.06))'}}>
            <h3 style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '16px'}}>
              Settlement Status
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
              {[
                {person: 'Rajesh Kumar', amount: '₹340', status: 'owes you'},
                {person: 'Sana Mishra', amount: '₹250', status: 'owes you'},
                {person: 'Arjun Dutt', amount: '₹75', status: 'owes you'}
              ].map((settle, i) => (
                <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < 2 ? '16px' : '0', borderBottom: i < 2 ? '1px solid rgba(26,22,18,0.07)' : 'none'}}>
                  <div>
                    <div style={{fontSize: '13px', fontWeight: 600, color: 'var(--ink)'}}>
                      {settle.person}
                    </div>
                    <div style={{fontSize: '11px', color: 'var(--muted)', marginTop: '2px'}}>
                      {settle.status}
                    </div>
                  </div>
                  <div style={{fontFamily: 'var(--PD)', fontSize: '16px', fontWeight: 700, color: 'var(--sage)'}}>
                    {settle.amount}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" style={{marginTop: '16px', width: '100%'}}>
              Request Settlement
            </Button>
          </Card>
        </div>
      </section>

      {/* EXPENSE BREAKDOWN */}
      <section className="section warm">
        <div className="container">
          <h2 className="section-title ink" style={{marginBottom: '40px'}}>Expense Breakdown</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px'}}>
            {/* Categories */}
            <div>
              <h3 style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '16px'}}>
                By Category
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {[
                  {category: 'Food & Dining', amount: '₹1,800', percent: 42},
                  {category: 'Transport', amount: '₹1,200', percent: 28},
                  {category: 'Activities', amount: '₹800', percent: 19},
                  {category: 'Miscellaneous', amount: '₹480', percent: 11}
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px'}}>
                      <span style={{fontSize: '13px', fontWeight: 500, color: 'var(--ink3)'}}>
                        {item.category}
                      </span>
                      <span style={{fontSize: '13px', fontWeight: 600, color: 'var(--orange)'}}>
                        {item.amount}
                      </span>
                    </div>
                    <div style={{height: '6px', background: 'rgba(26,22,18,0.07)', borderRadius: '3px', overflow: 'hidden'}}>
                      <div style={{height: '100%', background: 'var(--orange)', width: `${item.percent}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Overview */}
            <div>
              <h3 style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '16px'}}>
                Who Paid What
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {[
                  {name: 'Priya Sharma', paid: '₹1,800', contribution: 42},
                  {name: 'You', paid: '₹1,200', contribution: 28},
                  {name: 'Rajesh Kumar', paid: '₹800', contribution: 19},
                  {name: 'Sana Mishra', paid: '₹480', contribution: 11}
                ].map((person, i) => (
                  <div key={i}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px'}}>
                      <span style={{fontSize: '13px', fontWeight: 500, color: 'var(--ink3)'}}>
                        {person.name}
                      </span>
                      <span style={{fontSize: '13px', fontWeight: 600, color: 'var(--ink)'}}>
                        {person.paid}
                      </span>
                    </div>
                    <div style={{height: '6px', background: 'rgba(26,22,18,0.07)', borderRadius: '3px', overflow: 'hidden'}}>
                      <div style={{height: '100%', background: 'var(--sage)', width: `${person.contribution}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSACTION LIST */}
      <section className="section cream">
        <div className="container">
          <h2 className="section-title ink" style={{marginBottom: '24px'}}>All Transactions</h2>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
            {[
              {date: 'Today, 2:30 PM', desc: 'Lunch at base camp', category: 'Food & Dining', amount: '₹840', by: 'You paid'},
              {date: 'Yesterday, 6:00 PM', desc: 'Evening snacks', category: 'Food & Dining', amount: '₹360', by: 'You paid'},
              {date: '2 days ago, 10:00 AM', desc: 'Entry tickets', category: 'Activities', amount: '₹800', by: 'Priya paid'},
              {date: '2 days ago, 8:00 AM', desc: 'Breakfast spread', category: 'Food & Dining', amount: '₹600', by: 'Priya paid'},
              {date: '3 days ago, 5:00 PM', desc: 'Transport from city', category: 'Transport', amount: '₹1,200', by: 'You paid'},
              {date: '4 days ago, 3:00 PM', desc: 'First aid kit', category: 'Miscellaneous', amount: '₹480', by: 'Rajesh paid'}
            ].map((txn, i) => (
              <div key={i} style={{display: 'grid', gridTemplateColumns: '200px 1fr 120px', gap: '20px', alignItems: 'center', padding: '16px 0', borderBottom: i < 5 ? '1px solid rgba(26,22,18,0.07)' : 'none'}}>
                <div>
                  <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink3)'}}>
                    {txn.date}
                  </div>
                  <div style={{fontSize: '11px', color: 'var(--muted)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '.05em'}}>
                    {txn.category}
                  </div>
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 500, color: 'var(--ink)'}}>
                    {txn.desc}
                  </div>
                  <div style={{fontSize: '11px', color: 'var(--muted)', marginTop: '2px'}}>
                    {txn.by}
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontFamily: 'var(--PD)', fontSize: '16px', fontWeight: 700, color: 'var(--orange)', lineHeight: 1}}>
                    {txn.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Expense Button */}
          <Button variant="primary" style={{marginTop: '24px', width: '100%'}}>
            + Add New Expense
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}
