import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import AnalysisOverview from './pages/Analysis/AnalysisOverView';
import CodeTransformationsOverview from './pages/Analysis/CodeTransformations/CodeTransformationsOverview';
import HardCodingAnalysisOverview from './pages/Analysis/HardCodingAnalysis/HardCodingAnalysisOverview';
import PackageDependencyNetworkGraphContainer from './pages/Analysis/PackageDependency/PackageDependencyNetworkGraphContainer';
import PackageDepOverview from './pages/Analysis/PackageDependency/PackageDepOverview';
import RepositoryOverview from './pages/Analysis/RepositoryOverview/RepositoryOverview';
import TechDependencyOverview from './pages/Analysis/TechDependencyOverview';
import UsageAnalysisOverview from './pages/Analysis/UsageAnalysis/UsageAnalysisOverview';
import PageNotFound from './pages/Auth/Page404';
import ClassificationConfigurationOverview from './pages/Classification/ClassificationConfigurationOverview';
import Customer from './pages/Customers/Customer';
import Home from './pages/Home/Home';
import Lookups from './pages/Lookups/Lookups';
import OrganizationContainer from './pages/Organizations/OrganizationContainer';

const Routes = () => (
  <Router basename="/r">
    <Nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/customer/:mode/:id?" component={Customer} />
        <Route path="/lookups" component={Lookups} />
        <Route path="/organizations" component={OrganizationContainer} />
        <Route path="/classifications" component={ClassificationConfigurationOverview} />
        <Route path="/analysisoverview/:groupId" component={AnalysisOverview} />
        <Route path="/usageanalysis/:groupId/:landscapeId" component={UsageAnalysisOverview} />
        <Route path="/repositoryOverview/:groupId/:landscapeId/" component={RepositoryOverview} />
        <Route path="/codetransformations/:groupId/:landscapeId/" component={CodeTransformationsOverview} />
        <Route path="/techdependency/:groupId/:landscapeId" component={TechDependencyOverview} />
        <Route
          path="/packagedependency/graph/:groupId/:landscapeId/:entryDevClass"
          component={PackageDependencyNetworkGraphContainer}
        />
        <Route path="/packageDependency/:groupId/:landscapeId" component={PackageDepOverview} />
        <Route path="/hardcodingAnalysis/:groupId/:landscapeId" component={HardCodingAnalysisOverview} />

        <Route component={PageNotFound} />
      </Switch>
    </Nav>
  </Router>
);

export default Routes;
