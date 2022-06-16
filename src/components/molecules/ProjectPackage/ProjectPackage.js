import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import { runNpmScript, getDependencyVersions, updatePackage } from './projectPackageActions';
import { noop } from 'utils/noop';
import { updateDependencyVersions } from './helper';
import { SCPackageTitle, SCFlexWrapper, SCNpmBtnWrapper, SCNpmTables, SCTableHeaderCell, SCTableCell } from './styles';

const ZERO = 0;
const ONE = 1;
const npmHeaders = [{ label: 'Modules' }, { label: 'Current' }, { label: 'Latest' }];

const Table = ({ headers, body }) => {
  const renderHeaders = headers.map((item) => {
    return <SCTableHeaderCell key={item.label}>{item.label}</SCTableHeaderCell>;
  });

  return (
    <table>
      <thead>
        <tr>{renderHeaders}</tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  );
};

const Package = ({ root }) => {
  const dispatch = useDispatch();
  const [selectedDeps, setSelectedDeps] = useState([]);
  const { packageJson, versions } = useSelector((state) => state.project);

  const { name, description, scripts, dependencies, devDependencies } = packageJson;

  const packageCommands = Object.keys(scripts).map((scriptName) => {
    return (
      <Button
        isSecondary
        key={scriptName}
        label={scriptName}
        onClick={() => {
          dispatch(runNpmScript(root, scriptName));
        }}
      />
    );
  });

  const handleSelectAll = () => {
    const allDeps = {
      ...versions.devDependencies,
      ...versions.dependencies
    };
    const selectedLatestVersions = Object.keys(allDeps).map((key) => {
      return { [key]: allDeps[key] };
    });

    setSelectedDeps(selectedLatestVersions);
  };

  const renderCells = (entry, v) => {
    return Object.keys(entry).map((key) => {
      const depVersion = v ? v[key] : '-';
      const latestVersion = depVersion === entry[key] ? '-' : depVersion;
      const hasUpdate = latestVersion !== '-';
      const matched = selectedDeps.find((item) => !!item[key]);
      const isActive = hasUpdate && Boolean(matched);
      const handleClick = () => {
        const updatedSelection = matched
          ? selectedDeps.filter((item) => !item[key])
          : selectedDeps.concat({ [key]: latestVersion });

        setSelectedDeps(updatedSelection);
      };

      return (
        <tr key={key}>
          <SCTableCell>
            <span>{key}</span>
          </SCTableCell>
          <SCTableCell isSmall>
            <span>{entry[key]}</span>
          </SCTableCell>
          <SCTableCell isSmall isClickable isActive={isActive} onClick={hasUpdate ? handleClick : noop}>
            <span>{latestVersion}</span>
          </SCTableCell>
        </tr>
      );
    });
  };

  return (
    <div>
      <SCPackageTitle>
        Repository: {name} - {description}
      </SCPackageTitle>
      <SCFlexWrapper>
        <SCNpmTables>
          <div>
            <h3> Dependencies </h3>
            <Table headers={npmHeaders} body={renderCells(dependencies, versions.dependencies)} />
          </div>
          <div>
            <h3> Dev Dependencies </h3>
            <Table headers={npmHeaders} body={renderCells(devDependencies, versions.devDependencies)} />
          </div>
        </SCNpmTables>
        <SCFlexWrapper>
          <SCNpmBtnWrapper>
            <Button
              isPrimary
              label="Load Versions"
              onClick={() => {
                dispatch(getDependencyVersions(root));
              }}
            />
            <Button
              isPrimary
              label="Update Versions"
              onClick={() => {
                dispatch(updatePackage(root, updateDependencyVersions(packageJson, selectedDeps)));
              }}
            />
            <Button isPrimary label="Select All" onClick={handleSelectAll} />
          </SCNpmBtnWrapper>
          <SCNpmBtnWrapper>{packageCommands}</SCNpmBtnWrapper>
        </SCFlexWrapper>
      </SCFlexWrapper>
    </div>
  );
};

export default Package;
