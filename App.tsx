import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Preview from './pages/Preview';
import Gallery from './pages/Gallery';
import Tips from './pages/Tips';
import { ProposalData } from './types';

const App: React.FC = () => {
  // Central State for the Generator Data
  const [sharedData, setSharedData] = useState<ProposalData>({
    senderName: '',
    recipientName: '',
    relationshipType: null,
    style: 'Sweet & Romantic' as any,
    customMessage: '',
    musicEnabled: true
  });

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Generator setSharedData={setSharedData} />} />
          <Route path="/preview" element={<Preview data={sharedData} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;